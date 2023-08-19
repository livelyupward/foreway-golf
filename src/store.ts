import { defineStore } from 'pinia';
import { computed, ComputedRef, ref, Ref } from 'vue';
import router from './router';
import isDebug from './plugins/debugConsole';

export const mainStore = defineStore('main', () => {
  const currentRound: Ref<Round> = ref({
    courseId: undefined,
    userId: undefined,
    closed: false,
    scores: [],
  });
  const currentCourse: Ref<Course | null> = ref(null);
  const user: Ref<User | undefined> = ref();
  const currentHoleInScoreModal: Ref<number | undefined> = ref(undefined);
  const scoreModalOpen: Ref<boolean> = ref(false);

  const computedScoreModal: ComputedRef<boolean> = computed(() => {
    return scoreModalOpen.value;
  });

  const getCurrentRound: ComputedRef<Round> = computed(() => {
    return currentRound.value;
  });

  const getCurrentCourse: ComputedRef<Course | null> = computed(() => {
    return currentCourse.value;
  });

  const getUser: ComputedRef<User | undefined> = computed(() => {
    return user.value;
  });

  async function openScoreModal(): Promise<boolean> {
    return (scoreModalOpen.value = true);
  }
  async function closeScoreModal(): Promise<boolean> {
    return (scoreModalOpen.value = false);
  }

  async function toggleScoreModal(): Promise<boolean> {
    return (scoreModalOpen.value = !scoreModalOpen.value);
  }

  async function setUser(userPayload: any): Promise<any> {
    return (user.value = userPayload);
  }

  function resetUser(): undefined {
    return (user.value = undefined);
  }

  async function setHoleInScoreModal(holeNumberToSet: number): Promise<number> {
    return (currentHoleInScoreModal.value = holeNumberToSet);
  }

  async function createNewRound(courseInfoObject: RoundSettings) {
    const newRoundRequest: Response = await fetch(`/api/round/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseId: courseInfoObject.courseId,
        userId: getUser.value !== undefined ? getUser.value.id : null,
        groupId: courseInfoObject.groupId ? courseInfoObject.groupId : null,
        tees: courseInfoObject.tees,
      }),
    });

    const newRoundResponse = await newRoundRequest.json();
    newRoundResponse.scores = [];
    // currentCourse.value = courseInfoObject;
    currentRound.value = newRoundResponse;

    const userRoundRequest: Response = await fetch(
      // @ts-ignore
      `/api/users/${getUser.value.id}?roundId=${newRoundResponse.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const userRoundResponse = await userRoundRequest.json();

    return { round: newRoundResponse, user: userRoundResponse };
  }

  async function goToRound(roundId: number | undefined) {
    return await router.push(`/round/${roundId}`);
  }

  async function submitScore(payload: ScoreForSubmit) {
    try {
      const newScoreRequest = await fetch(`/api/scores/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          strokes: payload.strokes,
          putts: payload.putts,
          gir: payload.toggles.greenInReg,
          fairway: payload.toggles.fairwayHit,
          hazard: payload.toggles.hazard,
          penalty: payload.toggles.penalty,
          penaltyStrokes: payload.toggles.penalty ? payload.penaltyStrokes : undefined,
          roundId: payload.roundId,
          holeId: payload.holeId,
          userId: payload.userId,
        }),
      });

      const newSavedScore = await newScoreRequest.json();

      isDebug() && console.log('currentRound after submitScore() before splice:: ', currentRound.value);
      currentRound.value.scores[newSavedScore.holeId - 1] = newSavedScore;
      isDebug() && console.log('currentRound after submitScore() after splice:: ', currentRound.value);

      return newSavedScore;
    } catch (error) {
      isDebug() && console.error({ error });
      return { error };
    }
  }

  async function submitEditedScore(payload: ScoreForSubmit) {
    if (payload.scoreId === undefined)
      return { error: 'No score id was found for the original score record. Cannot save new score.' };
    try {
      // @ts-ignore
      const newScoreEditedRequest: Response = await fetch(`/api/scores/${payload.scoreId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          strokes: payload.strokes,
          putts: payload.putts,
          gir: payload.toggles.greenInReg,
          fairway: payload.toggles.fairwayHit,
          hazard: payload.toggles.hazard,
          penalty: payload.toggles.penalty,
          penaltyStrokes: payload.toggles.penalty ? payload.penaltyStrokes : undefined,
          roundId: payload.roundId,
          holeId: payload.holeId,
          userId: payload.userId,
        }),
      });

      const newSavedEditedScore: EditedScore = await newScoreEditedRequest.json();

      currentRound.value.scores[newSavedEditedScore.holeId - 1] = newSavedEditedScore;
      isDebug() && console.dir(newSavedEditedScore);

      return newSavedEditedScore;
    } catch (error) {
      isDebug() && console.error({ error });
      return { error };
    }
  }

  async function authAndGetUserFromDB(): Promise<any> {
    // if token is saved in DB
    if (localStorage.getItem('gg_token')) {
      try {
        /**
         * send cached token to Google auth
         */
        const cachedTokenSend: Response = await fetch(`/api/auth?cred=${localStorage.getItem('gg_token')}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (cachedTokenSend.status === 403) {
          localStorage.removeItem('gg_token');
          resetUser();
          await router.push('/auth');
        }

        const cachedTokenResponse = await cachedTokenSend.json();
        const userDbFetch: Response = await fetch(`/api/users/${cachedTokenResponse.email}`);

        if (userDbFetch.status === 404) return await router.push('/auth');
        const userDbResponse: object[] = await userDbFetch.json();

        await setUser(userDbResponse[0]);
        if (getUser.value && getUser.value.currentRound) {
          isDebug() && console.log('current: ', getUser.value?.currentRound);
          const getRoundRequest: Response = await fetch(`/api/round/${getUser.value.currentRound}`);
          currentRound.value = await getRoundRequest.json();
        } else {
        }
        // @ts-ignore
        return userDbResponse[0];
      } catch (error) {
        localStorage.removeItem('gg_token');
        isDebug() && console.error(error);
      }
    }
  }

  async function getRecentUserRounds(): Promise<any> {
    if (getUser.value !== undefined) {
      try {
        const recentRoundsRequest: Response = await fetch(`/api/round/${getUser.value.id}/recent`);

        return recentRoundsRequest.json();
      } catch (error) {
        return { error };
      }
    }
  }

  async function getAllCourses() {
    try {
      const allCoursesFetch = await fetch(`/api/courses`);
      const courses = await allCoursesFetch.json();

      return { courses };
    } catch (error) {
      return { error };
    }
  }

  async function getCourse(courseId: number) {
    try {
      const courseFetch: Response = await fetch(`/api/courses/${courseId}?holes=true`);
      if (courseFetch.status === 404) {
        return { status: 404 };
      }
      const course: Course = await courseFetch.json();

      currentCourse.value = course;

      return { course };
    } catch (error) {
      return { error };
    }
  }

  async function closeRound(): Promise<any> {
    if (getUser.value !== undefined && getCurrentRound.value !== null) {
      try {
        // take current round and make null for current user
        user.value !== undefined && user.value.currentRound !== null ? (user.value.currentRound = null) : null;

        const updateUserRoundRequest: Response = await fetch(`/api/users/${getUser.value.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...user.value, currentRound: null }),
        });
        const updateUserRoundResponse: Promise<any> = updateUserRoundRequest.json();

        const endRoundRequest: Response = await fetch(`/api/round/${getCurrentRound.value.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...getCurrentRound.value, closed: true }),
        });
        const endRoundResponse: Promise<any> = endRoundRequest.json();

        return { message: 'Round ended successfully.', round: endRoundResponse, user: updateUserRoundResponse };
      } catch (error) {
        return { error };
      }
    } else {
      return { error: 'Could not find an active round.' };
    }
  }

  async function deleteRoundFromScorecard() {
    if (getUser.value !== undefined && getCurrentRound.value !== null) {
      try {
        // take current round and make null for current user
        user.value !== undefined && user.value.currentRound !== null ? (user.value.currentRound = null) : null;

        const updateUserRoundRequest: Response = await fetch(`/api/users/${getUser.value.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...user.value, currentRound: null }),
        });
        const updateUserRoundResponse: Promise<any> = updateUserRoundRequest.json();

        const deleteCurrentRoundRequest: Response = await fetch(`/api/round/${getCurrentRound.value.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...getCurrentRound.value, closed: true }),
        });
        const deleteCurrentRoundResponse: Promise<any> = deleteCurrentRoundRequest.json();

        return {
          message: 'Round deleted successfully.',
          round: deleteCurrentRoundResponse,
          user: updateUserRoundResponse,
        };
      } catch (error) {
        return { error };
      }
    } else {
      return { error: 'Could not find an active round to delete.' };
    }
  }

  async function getAllUserRounds(userId: number | undefined) {
    if (userId === undefined) return { rounds: [] };

    try {
      const allUserRoundsByIdRequest = await fetch(`/api/round/${userId}/all`);
      const allUserRoundsByIdResponse = await allUserRoundsByIdRequest.json();

      return { rounds: allUserRoundsByIdResponse };
    } catch (error) {
      return { error };
    }
  }

  async function getRoundById(id: string | undefined) {
    try {
      const roundByIdRequest = await fetch(`/api/round/${id}`);
      const roundByIdResponse = await roundByIdRequest.json();

      return { round: roundByIdResponse };
    } catch (error) {
      return { error };
    }
  }

  async function getLowestRounds(userId: number | undefined) {
    if (userId === undefined) return { lowRounds: [] };

    try {
      const lowestRoundsByIdRequest = await fetch(`/api/round/${userId}/lowest`);
      const lowestRoundsByIdResponse = await lowestRoundsByIdRequest.json();

      return { lowRounds: lowestRoundsByIdResponse };
    } catch (error) {
      return { error };
    }
  }

  async function changeRoundTotalSetting(newValue: boolean) {
    try {
      if (getUser.value === undefined) throw new Error('No user is present before preferences changed.');

      const roundSettingChangeRequest = await fetch(`/api/users/${getUser.value.id}/round-total`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...getUser.value, showRoundTotals: newValue }),
      });
      const roundSettingChangeResponse = await roundSettingChangeRequest.json();

      return { user: roundSettingChangeResponse };
    } catch (error) {
      return { error };
    }
  }

  async function getThisYearsStats() {
    if (getUser.value === undefined) throw new Error('Cannot find user id for stats request.');

    const yearStatsRequest = await fetch(`/api/round/stats/${getUser.value.id}`);
    if (!yearStatsRequest.ok) throw new Error('Year stats could not be fetched.');

    const yearStatsResponse = await yearStatsRequest.json();

    console.log('stats: ', yearStatsResponse);

    const currentYear = new Date().getUTCFullYear();
    return yearStatsResponse.filter((obj: Object) => {
      // @ts-ignore
      const createdAtYear = new Date(obj.createdAt).getUTCFullYear();
      return createdAtYear === currentYear;
    });
  }

  return {
    computedScoreModal,
    currentHoleInScoreModal,
    getCurrentRound,
    getCurrentCourse,
    getUser,
    getRecentUserRounds,
    getAllCourses,
    getCourse,
    getThisYearsStats,
    authAndGetUserFromDB,
    openScoreModal,
    closeScoreModal,
    toggleScoreModal,
    setHoleInScoreModal,
    setUser,
    createNewRound,
    goToRound,
    submitScore,
    submitEditedScore,
    closeRound,
    deleteRoundFromScorecard,
    getRoundById,
    getLowestRounds,
    getAllUserRounds,
    changeRoundTotalSetting,
  };
});

export interface Round {
  id?: number;
  courseId?: number;
  userId?: number;
  closed: boolean;
  scores: Array<Score>;
  holes?: Array<Hole>;
  updatedAt?: Date;
  course?: Course;
  totalStrokes?: number;
}

export interface Score {
  id?: number;
  strokes?: number;
  putts?: number;
  gir: boolean;
  fairway: boolean;
  roundId?: number;
  holeId?: number;
  userId?: number;
}

interface EditedScore extends Score {
  id: number;
  strokes?: number;
  putts?: number;
  gir: boolean;
  fairway: boolean;
  roundId: number;
  holeId: number;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  currentRound: number | null;
  createdAt: string;
  updatedAt: string;
  showRoundTotals: boolean;
  round: Round[] | null;
}

export interface Hole {
  id: number;
  number: number;
  yardage: number;
  par: number;
  tees: string[];
  handicap: number;
  courseId: number;
}

export interface Course {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber?: string;
  webpage?: string;
  courseImage?: string;
  holeCount: number;
  tees?: string[];
  holes: Hole[];
  createdAt?: string;
  updatedAt?: string;
}

export interface RoundSettings {
  courseId?: number;
  courseName?: string;
  groupId?: number;
  tees?: string | string[];
  userId?: number;
}

export interface ScoreForSubmit {
  strokes?: number;
  putts?: number;
  toggles: Toggles;
  penaltyStrokes?: number;
  roundId?: number;
  holeId?: number;
  userId?: number;
  scoreId?: number;
}

export interface Toggles {
  greenInReg: boolean;
  fairwayHit: boolean;
  hazard: boolean;
  penalty: boolean;
}

export interface MiddleMan {
  success: (messageToShowInFunc: string) => void;
  reject: (messageToShowInFunc: string) => void;
}
