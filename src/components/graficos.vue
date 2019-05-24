<template>
    <div class="graficos">
        <v-toolbar
            color="blue darken-3"
            dark
            class="headline"
        >
            <v-btn 
                large 
                icon
                @click="backHome"
            >
                <v-avatar size="45px" tile>
                    <img
                    src="../components/logo.png"
                    alt="Nomu"
                    >
                </v-avatar>
            </v-btn>

            <v-toolbar-title class="white--text">Nomu Graphics</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-icon large>timeline</v-icon>
        </v-toolbar>

        <v-container grid-list-md text-xs-center class="headline">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card tile>
                        <v-menu
                            ref="menu1"
                            :close-on-content-click="false"
                            v-model="menu1"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <v-text-field
                                slot="activator"
                                v-model="dateFormatted1"
                                label="From"
                                prepend-icon="event"
                            ></v-text-field>
                            <v-date-picker v-model="date1" no-title @input="menu1 = false"></v-date-picker>
                        </v-menu>

                        <v-menu
                            ref="menu2"
                            :close-on-content-click="false"
                            v-model="menu2"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <v-text-field
                                slot="activator"
                                v-model="dateFormatted2"
                                label="To"
                                prepend-icon="event"
                            ></v-text-field>
                            <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
                        </v-menu>
                        <v-btn 
                            fab 
                            dark 
                            small 
                            color="blue darken-3"
                            @click="changeData"
                        >
                            <v-icon dark>done_outline</v-icon>
                        </v-btn>
                    </v-card>
                </v-flex>

                <v-alert
                    v-if="!oktemp"
                    :value="true"
                    type="error"
                    color="red"
                >
                    Erro
                </v-alert>

                <v-flex xs6 v-if="hasData">
                    <v-card>

                        <v-toolbar
                            color="blue darken-3"
                            dark
                        >
                            <v-toolbar-title>pH</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-icon large>timeline</v-icon>
                        </v-toolbar>

                        <v-alert
                            v-if="!okph"
                            :value="true"
                            type="error"
                            color="red"
                        >
                            Erro
                        </v-alert>
                        <ve-line 
                            v-if="okph" 
                            :data="PH"
                            :legend-visible = "false">
                        </ve-line>
                        <download-excel
                            :fields = "json_fields_pH"
                            name    = "pH.xls"
                            :data   = "PH.rows"
                            v-if="okph"
                        >
                            <v-btn
                                :loading="loading1"
                                :disabled="loading1"
                                color="blue darken-4"
                                class="white--text"
                                @click="loader = 'loading1'"
                            >   
                                Export
                                <v-icon right dark>get_app</v-icon>
                            </v-btn>
                        </download-excel>
                    </v-card>
                </v-flex>

                <v-flex xs6 v-if="hasData">
                    <v-card>
                        <v-toolbar
                            color="blue darken-3"
                            dark
                        >
                            <v-toolbar-title>Electric Conductivity</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-icon large>timeline</v-icon>
                        </v-toolbar>

                        <v-alert
                            v-if="!okec"
                            :value="true"
                            type="error"
                            color="red"
                        >
                            Erro
                        </v-alert>
                        <ve-line 
                            v-if="okec" 
                            :data = "EC" 
                            :legend-visible = "false">
                        </ve-line>
                        <download-excel
                                :fields = "json_fields_ec"
                                name    = "condutividade.xls"
                                :data   = "EC.rows"
                                v-if="okec"
                            >   
                                <v-btn
                                    :loading="loading2"
                                    :disabled="loading2"
                                    color="blue darken-4"
                                    class="white--text"
                                    @click="loader = 'loading2'"
                                >   
                                    Export
                                    <v-icon right dark>get_app</v-icon>
                                </v-btn>
                        </download-excel>
                    </v-card>
                </v-flex>

                <v-flex xs6 v-if="hasData">
                    <v-card>
                        <v-toolbar
                            color="blue darken-3"
                            dark
                        >
                            <v-toolbar-title>Dissolved Oxygen</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-icon large>timeline</v-icon>
                        </v-toolbar>

                        <v-alert
                            v-if="!okod"
                            :value="true"
                            type="error"
                            color="red"
                        >
                            Erro
                        </v-alert>
                        <ve-line 
                            v-if="okod" 
                            :data="OD"
                            :legend-visible = "false">
                        </ve-line>
                        <download-excel
                            :fields = "json_fields_od"
                            name    = "od.xls"
                            :data   = "OD.rows"
                            v-if="okod"
                            width = "50px"
                        >
                            <v-btn
                                :loading="loading3"
                                :disabled="loading3"
                                color="blue darken-4"
                                class="white--text"
                                @click="loader = 'loading3'"
                            >
                                Export
                                <v-icon right dark>get_app</v-icon>
                            </v-btn>
                        </download-excel>
                    </v-card>
                </v-flex>

                <v-flex xs6 v-if="hasData">
                    <v-card>
                        <v-toolbar
                            color="blue darken-3"
                            dark
                        >
                            <v-toolbar-title>Turbidity</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-icon large>timeline</v-icon>
                        </v-toolbar>
                        <v-alert
                            v-if="!okturb"
                            :value="true"
                            type="error"
                            color="red"
                        >
                            Erro
                        </v-alert>
                        <ve-line 
                            v-if="okturb" 
                            :data="TURB"
                            :legend-visible = "false">
                        </ve-line>
                        <download-excel
                            :fields = "json_fields_turb"
                            name    = "turbidity.xls"
                            :data   = "TURB.rows"
                            v-if="okturb"
                        >
                            <v-btn
                                :loading="loading4"
                                :disabled="loading4"
                                color="blue darken-4"
                                class="white--text"
                                @click="loader = 'loading4'"
                            >
                                Export
                                <v-icon right dark>get_app</v-icon>
                            </v-btn>
                        </download-excel>
                    </v-card>
                </v-flex>

                <v-flex xs6 v-if="hasData">
                    <v-card>
                        <v-toolbar
                            color="blue darken-3"
                            dark
                        >
                            <v-toolbar-title>Volume</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-icon large>timeline</v-icon>
                        </v-toolbar>
                        <v-alert
                            v-if="!oknivel"
                            :value="true"
                            type="error"
                            color="red"
                        >
                            Erro
                        </v-alert>
                        <ve-line 
                            v-if="oknivel" 
                            :data="NIVEL"
                            :legend-visible = "false">
                        </ve-line>
                        <download-excel
                            :fields = "json_fields_nivel"
                            name    = "volume.xls"
                            :data   = "NIVEL.rows"
                            v-if="oknivel"
                        >
                            <v-btn
                                :loading="loading5"
                                :disabled="loading5"
                                color="blue darken-4"
                                class="white--text"
                                @click="loader = 'loading5'"
                            >
                                Export
                                <v-icon right dark>get_app</v-icon>
                            </v-btn>
                        </download-excel>
                    </v-card>
                </v-flex>

                <v-flex xs6 v-if="hasData">
                    <v-card>
                        <v-toolbar
                            color="blue darken-3"
                            dark
                        >
                            <v-toolbar-title>Temperature</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-icon large>timeline</v-icon>
                        </v-toolbar>
                        <v-alert
                            v-if="!oktemp"
                            :value="true"
                            type="error"
                            color="red"
                        >
                            Erro
                        </v-alert>
                        <ve-line 
                            v-if="oktemp" 
                            :data="TEMP"
                            :legend-visible = "false">
                        </ve-line>
                        <download-excel
                            :fields = "json_fields_temp"
                            name    = "temperature.xls"
                            :data   = "TEMP.rows"
                            v-if="oktemp"
                        >
                            <v-btn
                                :loading="loading6"
                                :disabled="loading6"
                                color="blue darken-4"
                                class="white--text"
                                @click="loader = 'loading6'"
                            >
                                Export
                                <v-icon right dark>get_app</v-icon>
                            </v-btn>
                        </download-excel>
                    </v-card>
                </v-flex>

                <v-flex xs6 v-if="hasData">
                    <v-card>
                        <v-toolbar
                            color="blue darken-3"
                            dark
                        >
                            <v-toolbar-title>T.D.S.</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-icon large>timeline</v-icon>
                        </v-toolbar>
                        <v-alert
                            v-if="!oktds"
                            :value="true"
                            type="error"
                            color="red"
                        >
                            Erro
                        </v-alert>
                        <ve-line 
                            v-if="oktds" 
                            :data="TDS"
                            :legend-visible = "false">
                        </ve-line>
                        <download-excel
                            :fields = "json_fields_tds"
                            name    = "tds.xls"
                            :data   = "TDS.rows"
                            v-if="oktds"
                        >
                            <v-btn
                                :loading="loading7"
                                :disabled="loading7"
                                color="blue darken-4"
                                class="white--text"
                                @click="loader = 'loading7'"
                            >
                                Export
                                <v-icon right dark>get_app</v-icon>
                            </v-btn>
                        </download-excel>
                    </v-card>
                </v-flex>

                <v-flex xs6 v-if="hasData">
                    <v-card>
                        <v-toolbar
                            color="blue darken-3"
                            dark
                        >
                            <v-toolbar-title>Salinity</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-icon large>timeline</v-icon>
                        </v-toolbar>
                        <v-alert
                            v-if="!oksal"
                            :value="true"
                            type="error"
                            color="red"
                        >
                            Erro
                        </v-alert>
                        <ve-line 
                            v-if="oksal" 
                            :data="SAL"
                            :legend-visible = "false">
                        </ve-line>
                        <download-excel
                            :fields = "json_fields_sal"
                            name    = "sal.xls"
                            :data   = "SAL.rows"
                            v-if="oksal"
                        >
                            <v-btn
                                :loading="loading8"
                                :disabled="loading8"
                                color="blue darken-4"
                                class="white--text"
                                @click="loader = 'loading8'"
                            >
                                Export
                                <v-icon right dark>get_app</v-icon>
                            </v-btn>
                        </download-excel>
                    </v-card>
                </v-flex>

                <v-flex xs12 v-if="hasData">
                    <v-card>
                        <v-toolbar
                            color="blue darken-3"
                            dark
                        >
                            <v-toolbar-title>W.Q.I.</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-icon large>timeline</v-icon>
                        </v-toolbar>
                        <v-alert
                            v-if="!okIqa"
                            :value="true"
                            type="error"
                            color="red"
                        >
                            Erro
                        </v-alert>
                        <ve-line 
                            v-if="okIqa" 
                            :data="WQI"
                            :legend-visible = "false">
                        </ve-line>
                        <download-excel
                            :fields = "json_fields_wqi"
                            name    = "wqi.xls"
                            :data   = "WQI.rows"
                            v-if="okIqa"
                        >
                            <v-btn
                                :loading="loading9"
                                :disabled="loading9"
                                color="blue darken-4"
                                class="white--text"
                                @click="loader = 'loading9'"
                            >
                                Export
                                <v-icon right dark>get_app</v-icon>
                            </v-btn>
                        </download-excel>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-footer
            dark
            height="auto"
        >
            <v-card
            class="flex"
            flat
            tile
            >
            <v-card-actions class="grey darken-3 justify-center">
                &copy;2019 — <strong>Nomu</strong>
            </v-card-actions>
            </v-card>
        </v-footer>
    </div>
</template>

<script>
    import VeLine from 'v-charts/lib/line.common'
    import { db } from '../main'

    export default{
        data (){
            return{
                title:'Graficos',
                PH: {
                    columns: ['Date', 'pH'],
                    rows : []
                },
                EC: {
                    columns: ['Date', 'Condutividade'],
                    rows: []
                },
                OD: {
                    columns: ['Date', 'Oxigenio'],
                    rows: []
                },
                TURB: {
                    columns: ['Date', 'Turbidez'],
                    rows: []
                },
                NIVEL: {
                    columns: ['Date', 'Nivel'],
                    rows: []
                },
                TEMP: {
                    columns: ['Date', 'Temperatura'],
                    rows: []
                },
                TDS: {
                    columns: ['Date', 'TDS'],
                    rows: []
                },
                SAL: {
                    columns: ['Date', 'Salinidade'],
                    rows: []
                },
                WQI: {
                    columns: ['Date', 'WQI'],
                    rows: []
                },
                vals: [],
                loader: null,
                loading1: false,
                loading2: false,
                loading3: false,
                loading4: false,
                loading5: false,
                loading6: false,
                loading7: false,
                loading8: false,
                loading9: false,
                menu1: false,
                menu2: false,
                date1: '',
                date2: '',
                dateFormatted1: '',
                dateFormatted2: '',
                init1: true,
                init2: true,
                json_fields_pH: {
                    'Data': 'Date',
                    'pH': 'pH'
                },
                json_fields_ec: {
                    'Data': 'Date',
                    'Condutividade': 'Condutividade'
                },
                json_fields_od: {
                    'Data': 'Date',
                    'Oxigênio Dissolvido': 'Oxigenio'
                },
                json_fields_turb: {
                    'Data': 'Date',
                    'Turbidez': 'Turbidez'
                },
                json_fields_nivel: {
                    'Data': 'Date',
                    'Nivel': 'Nivel'
                },
                json_fields_temp: {
                    'Data': 'Date',
                    'Temperatura': 'Temperatura'
                },
                json_fields_tds: {
                    'Data': 'Date',
                    'Tds': 'Tds'
                },
                json_fields_sal: {
                    'Data': 'Date',
                    'Salinidade': 'Salinidade'
                },
                json_fields_iqa: {
                    'Data': 'Date',
                    'WQI': 'WQI'
                },
                hasData: false,
                okph: false,
                okec: false,
                okod: false,
                okturb: false,
                oknivel: false,
                oktemp: false,
                oktds: false,
                oksal: false,
                okIqa: false,
                preDate1: '',
                preDate2: ''
            }
        },
        firestore (){
            return{
                valspH:     db.collection(this.$route.params.Pid).doc('pH').collection('medições'),
                valsEc:     db.collection(this.$route.params.Pid).doc('Condutividade').collection('medições'),
                valsOd:     db.collection(this.$route.params.Pid).doc('Oxigenio').collection('medições'),
                valsTu:     db.collection(this.$route.params.Pid).doc('Turbidez').collection('medições'),
                valsNi:     db.collection(this.$route.params.Pid).doc('Volume').collection('medições'),
                valsTe:     db.collection(this.$route.params.Pid).doc('Temperatura').collection('medições'),
                valsTds:     db.collection(this.$route.params.Pid).doc('TDS').collection('medições'),
                valsSal:     db.collection(this.$route.params.Pid).doc('Salinidade').collection('medições'),
                valsIqa:    db.collection(this.$route.params.Pid).doc('WQI').collection('medições')
            }
        },
        mounted () {
            this.initData()
        },
        components: { 
            VeLine 
        },
        methods: {
            initData: function(){
                this.PH.rows = this.valspH;
                this.okph = true;
                this.EC.rows = this.valsEc;
                this.okec = true;
                this.OD.rows = this.valsOd;
                this.okod = true;
                this.TURB.rows = this.valsTu;
                this.okturb = true;
                this.NIVEL.rows = this.valsNi;
                this.oknivel = true;
                this.TEMP.rows = this.valsTe;
                this.oktemp = true;
                this.TDS.rows = this.valsTds;
                this.oktds = true;
                this.SAL.rows = this.valsSal;
                this.oksal = true;
                this.WQI.rows = this.valsIqa;
                this.okIqa = true;

                this.hasData = true;

                this.date1 = this.valspH;
                this.date2 = this.valspH;
            },
            changeData: function() {
                var num1, num2, date1, date2, date3;

                this.PH.rows = [];
                num2 = 0;
                for(num1 = 0; num1 < this.valspH.length; num1++){
                    date1 = new Date(this.valspH[num1].Date.split(" ")[0]);
                    date2 = new Date(this.parseDate(this.dateFormatted1));
                    date3 = new Date(this.parseDate(this.dateFormatted2));

                    if(+date1 >= +date2 && +date1 <= +date3){
                        this.PH.rows[num2] = this.valspH[num1];
                        num2++;
                    }
                }
                if(this.PH.rows.length == 0){
                    this.okph = false;
                    this.hasData = false;
                }
                else{
                    this.okph = true;
                    this.hasData = true;
                }

                this.EC.rows = [];
                num2 = 0;
                for(num1 = 0; num1 < this.valsEc.length; num1++){
                    date1 = new Date(this.valsEc[num1].Date.split(" ")[0]);
                    date2 = new Date(this.parseDate(this.dateFormatted1));
                    date3 = new Date(this.parseDate(this.dateFormatted2));

                    if(+date1 >= + date2 && +date1 <= +date3){
                        this.EC.rows[num2] = this.valsEc[num1];
                        num2++;
                    }
                }
                if(this.EC.rows.length == 0) this.okec = false;
                else this.okec = true;

                this.OD.rows = [];
                num2 = 0;
                for(num1 = 0; num1 < this.valsOd.length; num1++){
                    date1 = new Date(this.valsOd[num1].Date.split(" ")[0]);
                    date2 = new Date(this.parseDate(this.dateFormatted1));
                    date3 = new Date(this.parseDate(this.dateFormatted2));

                    if(+date1 >= + date2 && +date1 <= +date3){
                        this.OD.rows[num2] = this.valsOd[num1];
                        num2++;
                    }
                }
                if(this.OD.rows.length == 0) this.okod = false;
                else this.okod = true;

                this.TURB.rows = [];
                num2 = 0;
                for(num1 = 0; num1 < this.valsTu.length; num1++){
                    date1 = new Date(this.valsTu[num1].Date.split(" ")[0]);
                    date2 = new Date(this.parseDate(this.dateFormatted1));
                    date3 = new Date(this.parseDate(this.dateFormatted2));

                    if(+date1 >= + date2 && +date1 <= +date3){
                        this.TURB.rows[num2] = this.valsTu[num1];
                        num2++;
                    }
                }
                if(this.TURB.rows.length == 0) this.okturb = false;
                else this.okturb = true;

                this.NIVEL.rows = [];
                num2 = 0;
                for(num1 = 0; num1 < this.valsNi.length; num1++){
                    date1 = new Date(this.valsNi[num1].Date.split(" ")[0]);
                    date2 = new Date(this.parseDate(this.dateFormatted1));
                    date3 = new Date(this.parseDate(this.dateFormatted2));

                    if(+date1 >= + date2 && +date1 <= +date3){
                        this.NIVEL.rows[num2] = this.valsNi[num1];
                        num2++;
                    }
                }
                if(this.NIVEL.rows.length == 0) this.oknivel = false;
                else this.oknivel = true;

                this.TEMP.rows = [];
                num2 = 0;
                for(num1 = 0; num1 < this.valsTe.length; num1++){
                    date1 = new Date(this.valsTe[num1].Date.split(" ")[0]);
                    date2 = new Date(this.parseDate(this.dateFormatted1));
                    date3 = new Date(this.parseDate(this.dateFormatted2));

                    if(+date1 >= + date2 && +date1 <= +date3){
                        this.TEMP.rows[num2] = this.valsTe[num1];
                        num2++;
                    }
                }
                if(this.TEMP.rows.length == 0) this.oktemp = false;
                else this.oktemp = true;

                this.TDS.rows = [];
                num2 = 0;
                for(num1 = 0; num1 < this.valsTds.length; num1++){
                    date1 = new Date(this.valsTds[num1].Date.split(" ")[0]);
                    date2 = new Date(this.parseDate(this.dateFormatted1));
                    date3 = new Date(this.parseDate(this.dateFormatted2));

                    if(+date1 >= + date2 && +date1 <= +date3){
                        this.TDS.rows[num2] = this.valsTds[num1];
                        num2++;
                    }
                }
                if(this.TDS.rows.length == 0) this.oktds = false;
                else this.oktds = true;

                this.SAL.rows = [];
                num2 = 0;
                for(num1 = 0; num1 < this.valsSal.length; num1++){
                    date1 = new Date(this.valsSal[num1].Date.split(" ")[0]);
                    date2 = new Date(this.parseDate(this.dateFormatted1));
                    date3 = new Date(this.parseDate(this.dateFormatted2));

                    if(+date1 >= + date2 && +date1 <= +date3){
                        this.SAL.rows[num2] = this.valsSal[num1];
                        num2++;
                    }
                }
                if(this.SAL.rows.length == 0) this.oksal = false;
                else this.oksal = true;

                this.WQI.rows = [];
                num2 = 0;
                for(num1 = 0; num1 < this.valsIqa.length; num1++){
                    date1 = new Date(this.valsIqa[num1].Date.split(" ")[0]);
                    date2 = new Date(this.parseDate(this.dateFormatted1));
                    date3 = new Date(this.parseDate(this.dateFormatted2));

                    if(+date1 >= + date2 && +date1 <= +date3){
                        this.WQI.rows[num2] = this.valsIqa[num1];
                        num2++;
                    }
                }
                if(this.WQI.rows.length == 0) this.okIqa = false;
                else this.okIqa = true;

                if(!this.hasData){
                    window.alert("Intervalo Inválido!");

                    this.date1 = this.preDate1;
                    this.dateFormatted1 = this.formatDate(this.date1);

                    this.date2 = this.preDate2;
                    this.dateFormatted2 = this.formatDate(this.date2);

                    this.hasData = true;
                    this.okph = true;
                    this.okec = true;
                    this.okod = true;
                    this.okturb = true;
                    this.oknivel = true;
                    this.oktemp = true;
                    this.oktds = true;
                    this.oksal = true;
                    this.okIqa = true;

                    this.changeData();
                }
            },
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [day, month, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            backHome: function(){
                this.$router.push({ name: 'home' })
            }
        },
        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 3000)

                this.loader = null
            },
            date1 () {
                if(this.init1 == true){
                    this.dateFormatted1 = this.formatDate(this.date1[0].Date.split(" ")[0]);
                    this.date1 = this.parseDate(this.dateFormatted1);
                    this.init1 = false;

                    this.preDate1 = this.date1;
                }
                else{
                    this.preDate2 = this.parseDate(this.dateFormatted2);
                    this.preDate1 = this.parseDate(this.dateFormatted1);

                    this.dateFormatted1 = this.formatDate(this.date1);
                }
            },
            date2 () {
                if(this.init2 == true){
                    this.dateFormatted2 = this.formatDate(this.date2[this.date2.length - 1].Date.split(" ")[0]);
                    this.date2 = this.parseDate(this.dateFormatted2);
                    this.init2 = false;

                    this.preDate2 = this.date2;
                }
                else{
                    this.preDate1 = this.parseDate(this.dateFormatted1);
                    this.preDate2 = this.parseDate(this.dateFormatted2);

                    this.dateFormatted2 = this.formatDate(this.date2);
                }
            }
        }
    }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>