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

  return {
    getFriends,
    sendFriendInvite,
  };
});
