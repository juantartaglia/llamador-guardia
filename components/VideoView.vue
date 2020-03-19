<template>
  <div
    v-observe-visibility="{
      callback: callbackMedia,
      intersection: { threhold: 1.0 }
    }"
    class="margin-auto"
  >
    <vue-plyr
      ref="videoplyr"
      :emit="['ready', 'timeupdate']"
      @timeupdate="videoTimeUpdated"
    >
      <video :src="mediaObject.src"></video>
    </vue-plyr>
  </div>
</template>

<script>
export default {
  name: "VideoView",
  props: ["mediaObject"],
  data() {
    return {
      video: false,
      image: false,
      active: null
    };
  },
  computed: {
    element: () => {
      return this.mediaObject;
    },
    player() {
      return this.$refs.videoplyr.player;
    }
  },

  methods: {
    callbackMedia(status) {
      //let timeOut = 0;
      console.log("CB Video");
      if (status) {
        //console.log(this.player);
        try {
          console.log("Try player");
          this.player.play();
        } catch (e) {
          console.log("Error en player");
        }
      }
    },
    videoTimeUpdated(data) {
      if (
        data.detail.plyr &&
        data.detail.plyr.currentTime == data.detail.plyr.duration &&
        data.detail.plyr.duration != 0
      ) {
        this.player.stop();
        console.log("Emit next-element video");
        //this.$emit("next-element");
        this.$store.commit("idle");
      }
    }
  }
};
</script>

<style scoped>
.margin-auto {
  margin: auto;
}
</style>
