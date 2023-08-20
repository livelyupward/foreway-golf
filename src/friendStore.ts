import { computed, ref, Ref } from 'vue';
import { defineStore } from 'pinia';
import { type User } from './store';

export const friendStore = defineStore('friend', () => {
  const friends = ref([]);
  const friendRequests: Ref<FriendRequests | undefined> = ref();

  const getFriends = computed(() => {
    return friends.value;
  });

  const getFriendRequestsGetter = computed(() => {
    return friendRequests.value;
  });

  async function getFriendsList(userId: number) {
    try {
      const getFriendsListRequest = await fetch(`http://localhost:4000/api/friends/${userId}`);

      if (!getFriendsListRequest.ok) {
        return { getFriendsListRequest, status: getFriendsListRequest.status };
      }

      const getFriendsListResponse = await getFriendsListRequest.json();
      friends.value = getFriendsListResponse;

      return getFriendsListResponse;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async function sendFriendInvite(userId: number, friendEmail: string) {
    try {
      const friendRequest = await fetch(`http://localhost:4000/api/friends/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, friendEmail }),
      });

      if (!friendRequest.ok) return friendRequest;

      const friendResponse = await friendRequest.json();

      return friendResponse;
    } catch (error) {
      return error;
    }
  }

  async function getFriendRequests(userId: number) {
    try {
      const friendRequestsRequest = await fetch(`http://localhost:4000/api/friends/requests/${userId}`);

      if (!friendRequestsRequest.ok) {
        return { status: friendRequestsRequest.status, error: friendRequestsRequest };
      }

      const friendRequestsResponse = await friendRequestsRequest.json();

      friendRequests.value = friendRequestsResponse;

      return friendRequestsResponse;
    } catch (error) {
      return error;
    }
  }

  async function denyFriendRequest(requestId: number) {
    try {
      const denyRequest = await fetch(`http://localhost:4000/api/friends/requests/deny/${requestId}`, {
        method: 'DELETE',
      });

      if (!denyRequest.ok) {
        return { status: denyRequest.status, error: denyRequest };
      }

      const denyResponse = await denyRequest.json();

      return denyResponse;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getFriends,
    getFriendRequestsGetter,
    getFriendsList,
    sendFriendInvite,
    getFriendRequests,
    denyFriendRequest,
  };
});

interface Friendship {
  id: number;
  userId: number;
  friendId: number;
  status: string;
  receivingUser: User;
  sendingUser: User;
}

export interface FriendRequests {
  requestsForMe: Friendship[];
  requestsFromFriends: Friendship[];
}
