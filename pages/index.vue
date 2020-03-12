<template>
   <v-row>
     <v-col :cols=9>
       <v-carousel
    cycle
    height="600"
    hide-delimiter-background
    :show-arrows="false"
    :interval=10000
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">{{ slide }} Slide</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
     </v-col>
     <v-col :cols=3>
       <v-list disabled>
      <v-subheader>Ultimos Llamados</v-subheader>
     
        <v-list-item
          v-for="(item, i) in elementos"
          :key="i"
        >
        
          <v-list-item-content>
            <v-list-item-title v-text="item.paciente"></v-list-item-title>
            <v-list-item-subtitle v-text="item.consultorio"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
    </v-list>


     </v-col>

      <v-dialog v-model="dialog">
        <v-alert
      color="blue-grey"
      dark
      dense
      icon="mdi-school"
      prominent
    >
      Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Aenean ut eros et nisl sagittis vestibulum. Sed aliquam ultrices mauris. Donec vitae orci sed dolor rutrum auctor.
    </v-alert>
    
      </v-dialog>



   </v-row>
   
</template>

<script>

export default {
  head () {
    return {
      script: [
        { src: 'https://js.pusher.com/4.1/pusher.min.js' }
      ]
    }
  },
  components: {
  },
  data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
        elementos : [],
        dialog: false
      }
    },
    mounted(){
      let pusher = new Pusher('5e9afaa1faa1698efbe9', {
          cluster: 'us2',
          encrypted: true
        });

        let channel = pusher.subscribe('guardia');
        channel.bind('publicar_llamado', (data)=>{
          if(this.elementos.length == 10) this.elementos.pop();
          this.elementos.unshift(data);
          this.dialog = true;
          setTimeout(()=> this.dialog = false, 8000);
        });
    },
    
  }
</script>
