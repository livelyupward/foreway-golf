import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const friendStore = defineStore('friend', () => {
  const friends = ref([]);

  const getFriends = computed(() => {
    return friends.value;
  });

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

  async function getFriendRequests(userId: string) {
    try {
      const friendRequestsRequest = await fetch(`http://localhost:4000/api/friends/requests/${userId}`);

      if (!friendRequestsRequest.ok) {
        return { status: friendRequestsRequest.status, error: friendRequestsRequest.error };
      }

      const friendRequestsResponse = await friendRequestsRequest.json();

      return friendRequestsResponse;
    } catch (error) {
      return error;
    }
  }

  async function denyFriendRequest(requestId: string) {
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
    sendFriendInvite,
    getFriendRequests,
    denyFriendRequest,
  };
});
