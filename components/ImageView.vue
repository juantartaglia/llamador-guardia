<template>
  <v-row>
    <v-col cols="12">
      <div
    v-observe-visibility="{
      callback: callbackMedia,
      intersection: { threhold: 1.0 }
    }"
  >

    <img max-width=""
      :alt="mediaObject.name"
      :src="mediaObject.src"
      class="responsive"
    ></img>
  </div>
    </v-col>
  </v-row>
  
</template>

<script>
//import { mapState } from "vuex";

export default {
  name: "ImageView",
  props: ["mediaObject"],

  computed: {
    element: () => {
      return this.mediaObject;
    }
  },
  methods: {
    callbackMedia(status) {
      console.log("Callback media ", status);
      /*if (!status) {
        setTimeout(() => {
          console.log("time out callbackmedia imagen");
          if (this.$store.state.counter === 1) this.$store.commit("idle");
        }, 6000);
      }
      */
      if (status) {
        console.log("Status false -> setTime");
        setTimeout(() => {
          console.log("Time Out Agotado Callmedia Image");
          if (this.$store.state.counter === 1) this.$store.commit("idle");
        }, this.mediaObject.timeout || 6000);
      }
    }
  }
};
</script>

<style scoped>
.responsive {
  object-fit: contain;
  width: 100%;
}
</style>
