import { defineStore } from 'pinia';
import { computed, ComputedRef, ref, Ref } from 'vue';
import router from './router';
import isDebug from './plugins/debugConsole';

export const mainStore = defineStore('main', () => {
  const currentRound: Ref<Round> = ref({
    courseId: null,
    userId: null,
    closed: false,
    scores: [],
  });
  const currentCourse: Ref<Course | null> = ref(null);
  const user: Ref<User | null> = ref(null);
  const drawerOpen: Ref<boolean> = ref(false);
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

  const getUser: ComputedRef<User | null> = computed(() => {
    return user.value;
  });

  const getDrawerState: ComputedRef<boolean> = computed(() => {
    return drawerOpen.value;
  });

  function closeDrawer(): void {
    drawerOpen.value = false;
  }

  function openDrawer(): void {
    drawerOpen.value = true;
  }

  function toggleDrawer(): boolean {
    return (drawerOpen.value = !drawerOpen.value);
  }

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

  function resetUser(): null {
    return (user.value = null);
  }

  async function setHoleInScoreModal(holeNumberToSet: number): Promise<number> {
    return (currentHoleInScoreModal.value = holeNumberToSet);
  }

  async function createNewRound(courseInfoObject: Course) {
    const newRoundRequest: Response = await fetch(`/api/round/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseInfoObject),
    });

    const newRoundResponse = await newRoundRequest.json();
    newRoundResponse.scores = [];
    currentCourse.value = courseInfoObject;
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
    return await router.push(`/rounds/${roundId}`);
  }

  async function submitScore(payload: Score) {
    try {
      const newScoreRequest = await fetch(`/api/scores/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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

  async function submitEditedScore(payload: Score) {
    try {
      const newScoreEditedRequest: Response = await fetch(`/api/scores/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const newSavedEditedScore: EditedScore = await newScoreEditedRequest.json();

      currentRound.value.scores[newSavedEditedScore.holeId - 1] = newSavedEditedScore;

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
          const getRoundRequest: Response = await fetch(`/api/round/${getUser.value.currentRound}`);
          currentRound.value = await getRoundRequest.json();
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
    if (getUser.value !== null) {
      try {
        const recentRoundsRequest: Response = await fetch(`/api/round/${getUser.value.id}/recent`);

        return recentRoundsRequest.json();
      } catch (error) {
        return { error };
      }
    }
  }

  async function getCourse(courseId: number) {
    try {
      const courseFetch: Response = await fetch(`/api/courses/${courseId}?holes=true`);
      const course: Course = await courseFetch.json();

      currentCourse.value = course;

      return { course };
    } catch (error) {
      return { error };
    }
  }

  async function closeRound(): Promise<any> {
    if (getUser.value !== null && getCurrentRound.value !== null) {
      try {
        // take current round and make null for current user
        user.value ? (user.value.currentRound = undefined) : null;

        const updateUserRoundRequest: Response = await fetch(`/api/users/${getUser.value.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user.value),
        });
        const updateUserRoundResponse: Promise<any> = updateUserRoundRequest.json();

        const endRoundRequest: Response = await fetch(`/api/round/${getCurrentRound.value.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(getCurrentRound.value),
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

  return {
    computedScoreModal,
    currentHoleInScoreModal,
    getCurrentRound,
    getCurrentCourse,
    getUser,
    getDrawerState,
    getRecentUserRounds,
    getCourse,
    authAndGetUserFromDB,
    openScoreModal,
    closeScoreModal,
    toggleScoreModal,
    setHoleInScoreModal,
    closeDrawer,
    toggleDrawer,
    setUser,
    createNewRound,
    goToRound,
    submitScore,
    submitEditedScore,
    closeRound,
  };
});

export interface Round {
  id?: number;
  courseId: number | null;
  userId: number | null;
  closed: boolean;
  scores: Array<Score>;
  holes?: Array<Hole>;
}

export interface Score {
  id?: number;
  strokes: number | null;
  putts: number | null;
  gir: boolean;
  fairway: boolean;
  roundId?: number;
  holeId?: number;
  userId?: number;
}

interface EditedScore {
  id: number;
  strokes: number;
  putts: number | null;
  gir: boolean;
  fairway: boolean;
  roundId: number;
  holeId: number;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  currentRound?: number;
  createdAt: string;
  updatedAt: string;
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
