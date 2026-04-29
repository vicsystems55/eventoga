<template>
  <div class="fixed bottom-6 right-6 z-50">
    <button
      @click="toggleAudio"
      class="flex items-center gap-3 rounded-full bg-black/80 px-5 py-3 text-white shadow-lg backdrop-blur border border-orange-500/30 hover:scale-105 transition"
    >
      <span
        class="h-3 w-3 rounded-full"
        :class="isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'"
      ></span>

      <span class="font-bold">
        {{ isPlaying ? 'Pause EventOga FM' : 'Play EventOga FM' }}
      </span>
    </button>

    <audio ref="audioRef" loop>
      <source src="../../public/allonsy.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const audioRef = ref(null)
const isPlaying = ref(false)

const toggleAudio = () => {
  if (!audioRef.value) return

  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    audioRef.value.play()
      .then(() => {
        isPlaying.value = true
      })
      .catch(() => {
        alert('Tap again to enable audio')
      })
  }
}

// Optional: try autoplay after user interaction anywhere
onMounted(() => {
  document.addEventListener('click', () => {
    if (!isPlaying.value && audioRef.value) {
      audioRef.value.play().then(() => {
        isPlaying.value = true
      }).catch(() => {})
    }
  }, { once: true })
})
</script>