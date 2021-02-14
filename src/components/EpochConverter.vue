<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-btn
        @click.prevent="
          {
            calculatePresent();
            myDate();
          }
        "
        label="Now"
        color="primary"
      ></q-btn>

      <q-btn @click="clear" label="Clear" color="primary"></q-btn>

      <q-btn
        v-if="dateString || epochValue"
        @click="myDate"
        label="Calculate"
        color="primary"
      ></q-btn>
    </div>
    <div class="q-pa-md" style="max-width: 300px">
      <q-input filled v-model="dateString">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="dateString" mask="ddd,DD MMM YYYY HH:mm:ss">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time
                v-model="dateString"
                mask="ddd,DD MMM YYYY HH:mm:ss"
                format24h
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="q-pa-md">
      <q-input
        v-model="epochValue"
        outlined
        id
        label="Epoch Value"
        clearable
        type="text"
      />
      <br />
      <q-input v-model="localTime" outlined id label="Local Time" type="text">
        <template v-slot:append>
          <q-btn
            v-if="localTime"
            round
            dense
            flat
            icon="content_copy"
            @click="copyToClip(localTime)"
          />
        </template>
      </q-input>
      <br />
      <q-input v-model="gmtTime" outlined id label="UTC time" type="text">
        <template v-slot:append>
          <q-btn
            v-if="gmtTime"
            round
            dense
            flat
            icon="content_copy"
            @click="copyToClip(gmtTime)"
          />
        </template>
      </q-input>
      <br />
      <q-input
        v-model="dayOfTheYear"
        outlined
        id
        label="Day of the year"
        type="text"
      />
      <br />
      <q-input
        v-model="weekNumber"
        outlined
        id
        label="Week of the year"
        type="text"
      />
      <br />
      <q-input v-model="unixTime" outlined id label="Unix time" type="text">
        <template v-slot:append>
          <q-btn
            v-if="unixTime"
            round
            dense
            flat
            icon="content_copy"
            @click="copyToClip(unixTime)"
          />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { copyToClipboard, date } from "quasar";

export default {
  data() {
    return {
      epochValue: "",
      localTime: "",
      gmtTime: "",
      dayOfTheYear: "",
      weekNumber: "",
      unixTime: "",
      dateString: ""
    };
  },
  methods: {
    myDate() {
      const dateInEpoch = new Date(this.dateString);
      const calculateUnixTime = this.epochValue
        ? this.epochValue
        : dateInEpoch.getTime() / 1000.0;
      const date = this.epochValue
        ? new Date(this.epochValue * 1000)
        : new Date(calculateUnixTime * 1000);
      const dayOTY = Math.floor(
        (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
      );
      const weekOfTheYear = Math.ceil(dayOTY / 7);
      console.log(this.dateString);

      this.localTime = date.toLocaleString();
      this.gmtTime = date.toUTCString();
      this.dayOfTheYear = dayOTY.toString();
      this.weekNumber = weekOfTheYear.toString();
      this.unixTime = calculateUnixTime.toString();
    },
    calculatePresent() {
      let timeStamp = Date.now();
      this.dateString = date.formatDate(timeStamp, "ddd,DD MMM YYYY HH:mm:ss");
    },
    clear() {
      this.epochValue = "";
      this.localTime = "";
      this.gmtTime = "";
      this.dayOfTheYear = "";
      this.weekNumber = "";
      this.unixTime = "";
      this.dateString = "";
    },
    copyToClip(text) {
      copyToClipboard(text)
        .then(() => {
          this.$q.notify({
            type: "positive",
            message: `Copied to clipboard`
          });

          console.log("copied to clipboard!!");
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
