<template>
	<gmap-map
        ref="mapRef"
		:center="center"
		:zoom="this.zoom"
        @zoom_changed="storeZoom"
        @center_changed="storeCenter"
	>   

        <GmapMarker
            :key="marker"
            v-for="(m, marker) in markers"
            :position="m"
            :clickable="true"
            :draggable="false"
            @click="onMarkerClick(m)"
        />

        <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
            <h3>{{infoContent}}</h3>
            Click again to view
        </gmap-info-window>

	</gmap-map>
</template>

<script>
    import { db } from '../main'
	export default {
	    data () {
	        return {
                center: {},
                markers: [],
                infoContent: '',
                infoWindowPos: null,
                infoWinOpen: true,
                currentMidx: null,
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
                zoom: 13
	        }
        },
        firestore (){
            return{
                markers: db.collection('markers')
            }
        },
        mounted() {
            this.geolocate();
            this.attMap();
        },
	    methods: {
            attMap(){
                if(localStorage.getItem("zoom") == null){
                    this.zoom = 9;
                }
                else{
                    this.zoom = Number(localStorage.getItem("zoom"));
                }

                if(localStorage.getItem("lat") == null){
                    this.center = { lat: 31.508, lng: -3.587 };
                }
                else{
                    this.center = {
                        lat : Number(localStorage.getItem("lat")),
                        lng : Number(localStorage.getItem("lng"))
                    }
                }
            },
            storeCenter(){
                this.$refs.mapRef.$mapPromise.then((map) => {
                    localStorage.setItem("lat", map.getCenter().lat());
                    localStorage.setItem("lng", map.getCenter().lng());
                });     
            },
            storeZoom(){
                this.$refs.mapRef.$mapPromise.then((map) => {
                    localStorage.setItem("zoom", map.getZoom());
                });                
            },
            onMarkerClick (marker) {
                this.infoWindowPos = marker;
                this.infoContent = 'Cistern ' + marker.id;

                if (this.currentMidx == marker.id && this.infoWinOpen == true && marker.id != 0) {
                    this.$router.push({ name: 'graficos',params:{Pid:marker.id} })
                }
                else {
                    this.infoWinOpen = true;
                    this.currentMidx = marker.id;

                }
            },
            geolocate: function() {
                if(localStorage.getItem("lat") == null){
                    navigator.geolocation.getCurrentPosition(position => {
                        this.center = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        /*var userMarker = {
                            id: '00',
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }

                        this.markers.push(userMarker);*/
                    });
                }
            }
        }
	}
</script>

<style>
    .vue-map-container{
        height:calc(100vh - 95px);
    }
</style>