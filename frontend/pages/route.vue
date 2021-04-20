<template>
  <div>
    <SideBar/>
    <h1 class="title">
      Plan your route
    </h1>
    <div class="place-container">
      <div>
        <div ref="mapDiv" style="width: 100%; height: 30vh"/>
        <div class="grid">
          <div>
            <h1 class="title">
              From:
            </h1>
            <input class="input-container"
                   ref="autocompleteFrom"
                   placeholder="Enter start location"
                   type="text"
            />
          </div>
          <div>
            <h1 class="title">
              To:
            </h1>
            <input class="input-container"
                   ref="autocompleteTo"
                   placeholder="Enter end location"
                   type="text"
            />
          </div>
        </div>
      </div>
      <div class="grid">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis libero orci. Mauris mattis libero ut
          risus dictum ornare eu id lacus. Suspendisse scelerisque eget enim elementum ultrices. Phasellus sed dolor
          sem. Nam et nulla eu tortor efficitur efficitur non ut sem. Maecenas quis nibh metus. Nunc eu nibh lorem.

          Nulla facilisi. Sed dignissim ultricies iaculis. Nunc et est ipsum. Mauris nisl orci, ornare sed euismod ut,
          viverra eget nisi. Mauris non mi consectetur, viverra ante cursus, pharetra lacus. Suspendisse volutpat urna
          et diam consequat lacinia. Sed hendrerit interdum quam, sit amet faucibus tortor commodo sed. Ut sit amet
          felis et ligula mollis porttitor. Vivamus quis dapibus magna. Ut accumsan ante interdum lorem mollis, vel
          luctus turpis tincidunt. In finibus imperdiet euismod. Pellentesque sagittis volutpat erat rhoncus tristique.
          Phasellus fringilla eget tellus in auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

          In vitae eleifend dolor. Fusce luctus vestibulum ligula, vel laoreet ex porta a. Vestibulum laoreet pretium
          nulla, at accumsan orci mattis id. Etiam a nunc sed leo elementum suscipit. Duis aliquam pulvinar tempor. Sed
          hendrerit libero sed nulla viverra, eget varius nisi dapibus. Vivamus tristique tristiquelibero vitae tempor.
        </p>
        <p>Suspendisse sit amet sodales nibh, vel tristique arcu. Vestibulum mattis venenatis nisi sit amet fermentum.
          Curabitur nec justo elit. Duis quis velit pharetra, suscipit massa in, porta mi. Nullam et sapien vitae mauris
          condimentum semper. Morbi a sapien non dolor imperdiet aliquet eu quis tortor. Morbi ultricies gravida ipsum,
          id rutrum tellus. Cras finibus nibh odio, a commodo sapien dignissim id. Vivamus rutrum arcu dolor, vel
          dignissim ante ultricies nec.

          Cras in aliquam risus. Aenean consequat, neque eu mattis placerat, eros lacus facilisis mi, et faucibus nisl
          sem finibus tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu ultricies justo. Aliquam
          ut purus pulvinar, dignissim purus sit amet, gravida neque. Aliquam velit purus, sollicitudin at velit at,
          elementum consequat velit. Maecenas vel diam ultrices, eleifend ex in, condimentum enim.

          Cras consectetur vitae elit at laoreet. Sed sodales tempor ligula. Maecenas imperdiet ultricies tellus, ac
          imperdiet ex gravida sed. Donec laoreet ligula in dolor vestibulum auctor. Nullam quis quam est. Ut non diam
          lacus. Sed ut urna pellentesque, interdum leo eu, sodales ex. Praesent elementum metus nec ullamcorper
          bibendum. Sed scelerisque lacinia eleifend. Donec dapibus iaculis ultrices.
        </p>
      </div>
      <NuxtLink class="link" to="/places">⌂</NuxtLink>
    </div>

  </div>
</template>


<script>
/* eslint-disable no-undef */
import {Loader} from '@googlemaps/js-api-loader';
import SideBar from "~/components/SideBar";
const GOOGLE_MAPS_API_KEY = 'GOOGLE_MAPS_API_KEY'


export default {
  name: "route",
  components: {
    SideBar
  },
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      },
      fromPos: {
        lat: 0,
        lng: 0
      },
      toPos: {
        lat: 0,
        lng: 0
      },
      autocompleteService: null,
      place: null,
      otherPos: null,
      mapDiv: null,
      map: null,
      loader: null,
      clickListener: null,
      line: null,
      isReady: false
    }
  },
  created() {
  },
  methods: {
    setFrom(place){
      this.place = place.getPlace()
      this.fromPos = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng(),
      }
    },
    setTo(place){
      this.place = place.getPlace()
      this.toPos = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng(),
      }
    }
  },
  async mounted() {
    await this.$getLocation({})
      .then((coordinates) => {
        this.coordinates = coordinates
      })
      .catch(error => alert(error))

    this.loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      libraries: ["places"]})
    await this.loader.load()

    this.map = new google.maps.Map(this.$refs["mapDiv"], {
      center: this.coordinates,
      zoom: 5
    })
    var from = new google.maps.places.Autocomplete(this.$refs["autocompleteFrom"]);
    var to = new google.maps.places.Autocomplete(this.$refs["autocompleteTo"]);
    google.maps.event.addListener(from, 'place_changed', () => {
      this.setFrom(from)
    });
    google.maps.event.addListener(to, 'place_changed', () => {
      this.setTo(to)
    });

  },
  destroyed() {
    if (this.clickListener) {
      this.clickListener.remove()
    }
    if (this.loader) {
      this.loader.deleteScript()
    }
  },
  watch: {
    toPos: function () {
      if (this.toPos && this.fromPos != null) {
        var directionsService = new google.maps.DirectionsService;
        var directionsRenderer = new google.maps.DirectionsRenderer;

        var map = new google.maps.Map(this.$refs["mapDiv"], {
          center: this.currPos,
          zoom: 5
        })

        directionsService.route({
          origin: this.fromPos,
          destination: this.toPos,
          travelMode: 'DRIVING',
          provideRouteAlternatives: true
        }, function (response, status) {
          if (status === 'OK') {
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(response);
          } else {
            alert('Directions request failed due to ' + status);
          }
        });
      }
    }
  },
}

</script>

<style scoped>
.place-container {
  max-width: 1400px;
  margin: 30px auto;
  overflow: auto;
  text-align: center;
  min-height: 200px;
  padding: 60px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

}
.input-container {
  margin: 10px auto;
  overflow: auto;
  text-align: center;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

}
.grid{
  margin-left: 50px;
  margin-right: 50px;
  column-gap: 50px;
  padding: 10px;
  display: grid;
  column-count: 2;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  justify-content: center;
  text-align: justify;
  align-items: center;
}
</style>
