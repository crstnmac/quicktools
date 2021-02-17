<template>
  <div>
    <div class="full-width row wrap justify-start items-start content-start">
      <div class="q-pa-md col-lg-6 col-xs-12 items-stretch ">
        <div class="q-pa-sm q-gutter-sm">
          <q-btn
            @click="clear"
            label="Clear"
            color="secondary"
            class="q-mb-sm"
          ></q-btn>
        </div>
        <div class="q-pa-sm">
          <q-input
            v-model="uglyJson"
            ref="jsonText"
            placeholder="paste or type JSON here..."
            filled
            type="textarea"
            rows="25"
            class="full-width"
          />
        </div>
        <div class="q-pa-sm">
          <q-chip
            color="teal"
            v-if="!jsonError"
            text-color="white"
            icon="bookmark"
          >
            Valid JSON ✔
          </q-chip>
        </div>
        <div class="q-pa-sm">
          <q-banner v-if="uglyJson && jsonError" class="text-white bg-red">
            {{ jsonError }}
          </q-banner>
        </div>
      </div>

      <div class="q-pa-md  col-lg-6 col-xs-12 items-stretch">
        <div class="q-pa-sm q-gutter-sm">
          <q-btn
            @click="copyToClip(prettyJson)"
            label="Copy Json"
            icon="content_copy"
            color="secondary"
            class="q-mb-sm"
            v-if="prettyJson"
          ></q-btn>
        </div>
        <div class="q-pa-sm">
          <json-tree ref="jsonTree" :data="jsonTreeData" :raw="prettyJson" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JsonTree from "vue-json-tree";
import { copyToClipboard } from "quasar";

export default {
  components: {
    JsonTree
  },
  data() {
    return {
      uglyJson: "",
      jsonError: "",
      jsonTreeData: "Add json data to the input field"
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
  },
  methods: {
    copyToClip(text) {
      copyToClipboard(text)
        .then(() => {
          this.$q.notify({
            type: "positive",
            message: `Copied to clipboard`,
            textColor: "black",
            badgeTextColor: "black"
          });

          console.log("copied to clipboard!!");
        })
        .catch(e => {
          console.log(e);
        });
    },
    clear() {
      const jsonT = this.$refs.jsonTree;
      jsonT.$props.raw = "";
      this.uglyJson = "";
    },
    pasteCapture(evt) {
      if (evt.target.nodeName === "INPUT") return;
      let text, onPasteStripFormattingIEPaste;
      evt.preventDefault();
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData("text/plain");
        this.$refs.jsonText.runCmd("insertText", text);
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData("text/plain");
        this.$refs.jsonText.runCmd("insertText", text);
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true;
          this.$refs.jsonText.runCmd("ms-pasteTextOnly", text);
        }
        onPasteStripFormattingIEPaste = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
