<template>
  <v-row align="stretch">
    <v-col :cols="9">
      <v-carousel
        hide-delimiter-background
        :show-arrows="false"
        hide-delimiters
        :cycle="false"
        ref="carousel1"
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <ImageView
            class="carousel-content"
            v-if="slide.type === 'image'"
            :mediaObject="slide"
          >
          </ImageView>

          <VideoView
            class="carousel-content"
            v-if="slide.type === 'video'"
            :mediaObject="slide"
          >
          </VideoView>
        </v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col :cols="3">
      <v-list disabled>
        <v-subheader>Ultimos Llamados</v-subheader>

        <v-list-item v-for="(item, i) in elementos" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="item.paciente"></v-list-item-title>
            <v-list-item-subtitle
              v-text="item.consultorio"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col> </v-col>
    <v-dialog dark overlay-opacity="0.98" v-model="dialog">
      <v-card
        color="#385F73"
        dark
        v-if="elementos.length"
        max-width="600"
        class="mx-auto"
      >
        <v-card-title class="headline">
          {{ elementos[0].paciente }}
        </v-card-title>
        <v-card-actions>
          {{ elementos[0].consultorio }}
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import VideoView from "../components/VideoView";
import ImageView from "../components/ImageView";

var cantMaxElements = 5;
export default {
  head() {
    return {
      script: [{ src: "https://js.pusher.com/4.1/pusher.min.js" }]
    };
  },
  components: { VideoView: VideoView, ImageView: ImageView },
  computed: mapState(["counter"]),
  watch: {
    counter(newValue, oldValue) {
      console.log("Counter changed");
      if (newValue === 0 && oldValue === 1) {
        this.nextElement();
      }
    }
  },

  data() {
    return {
      slides: [
        {
          name: "Video Institucional",
          src: "/videos/NuevocoronavirusCOVID19.mp4",
          type: "video",
          timeout: 7000
        }
        /*
        {
          name: "Video Institucional",
          src: "/images/fondo.jpg",
          type: "image",
          timeout: 9000,
          style: ""
        },
        */
        /*
        {
          name: "Video Institucional",
          src: "/videos/Rimbamband.mp4",
          type: "video",
          timeout: 7000
        }
        */
      ],
      elementos: [],
      dialog: false
    };
  },
  methods: {
    nextElement() {
      this.$store.commit("busy");
      this.$refs.carousel1.next();
    }
  },
  mounted() {
    /*
    this.elementos.push({
      paciente: "PACIENTE DE PRUEBA MOCK",
      consultorio: "CONSULTORIO PRUEBA"
    });
    this.dialog = true;
      */
    let pusher = new Pusher("5e9afaa1faa1698efbe9", {
      cluster: "us2",
      encrypted: true
    });
    let channel = pusher.subscribe("guardia");
    channel.bind("publicar_llamado", data => {
      if (this.elementos.length == cantMaxElements) this.elementos.pop();
      this.elementos.unshift(data);
      /*
      if (this.player && this.player.paying) this.player.pause();
      */
      this.dialog = true;
      setTimeout(() => {
        this.dialog = false;
        //if (this.player && this.player.paused) this.player.play();
      }, 8000);
    });
    /*
    if (this.player) {
      this.player.loop = true;
      this.player.play();
    }
    */
    //this.nextElement();
    if (this.$store.state.counter === 0) {
      this.$store.commit("busy");
    }
  }
};
</script>

<style scoped>
.carousel-content {
  margin: auto;
}
</style>
