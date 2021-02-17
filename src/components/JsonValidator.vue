<template>
  <div>
    <div class="full-width row wrap justify-start items-start content-start">
      <div class="q-pa-md col-6 col-md-6 items-stretch ">
        <q-input
          v-model="uglyJson"
          ref="jsonText"
          placeholder="paste or type JSON here..."
          filled
          type="textarea"
          rows="25"
        />
        <q-chip
          color="teal"
          v-if="!jsonError"
          text-color="white"
          icon="bookmark"
        >
          Valid JSON ✔
        </q-chip>
        <div
          class="text-weight-medium  text-negative"
          v-if="uglyJson && jsonError"
        >
          Error: {{ jsonError }}
        </div>
      </div>
      <div class="q-pa-md col-6 col-md-6  items-stretch">
        <json-tree :raw="prettyJson" />
      </div>
    </div>
  </div>
</template>

<script>
import JsonTree from "vue-json-tree";

export default {
  components: {
    JsonTree
  },
  data() {
    return {
      uglyJson: "",
      jsonError: ""
    };
  },
  computed: {
    prettyJson() {
      //reset error
      this.jsonError = ""; // eslint-disable-line
      let jsonValue = "";

      try {
        //parse json
        jsonValue = JSON.parse(this.uglyJson);
      } catch (e) {
        this.jsonError = JSON.stringify(e.message); // eslint-disable-line
        var textarea = this.$refs.jsonText;
        if (this.jsonError.indexOf("position") > -1) {
          // highlight error position
          var positionStr = this.jsonError.lastIndexOf("position") + 8;
          var posi = parseInt(
            this.jsonError.substr(positionStr, this.jsonError.lastIndexOf('"'))
          );
          if (posi >= 0) {
            textarea.setSelectionRange(posi, posi + 1);
          }
        }
        return "";
      }
      return JSON.stringify(jsonValue, null, 2);
    }
  }
};
</script>

<style lang="scss" scoped></style>
