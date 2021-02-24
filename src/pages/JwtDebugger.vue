<template>
  <div>
    <div class="q-pa-md">
      <div class="full-width full-height row">
        <div class="col-sm-12 col-md-6 padding5">
          <q-card bordered flat class="no-margin full-height">
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">JWT Token</div>
              <div class="text-caption text-grey">
                Paste your encoded JWT token here
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-input
                v-model="token"
                filled
                autogrow
                type="textarea"
                class="jwt_token"
                debounce="500"
                i
                @input="parseJwtToken"
              />
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="text-h6">JWKS Endpoint</div>
              <div class="text-caption text-grey">
                For RSA and ECDSA signed token paste your JWKS Endpoint URL
              </div>
              <q-input
                outlined
                v-model="jwksUri"
                placeholder="Your JWKS Endpoint"
                debounce="500"
                clearable
                @input="getJwksKeys"
              />
              <q-list
                bordered
                separator
                class="rounded-borders q-mt-sm"
                v-if="jwksKeys.length > 0"
              >
                <q-item
                  clickable
                  v-ripple
                  active-class="text-orange"
                  v-for="item in jwksKeys"
                  :key="item.kid"
                >
                  <q-item-section avatar>
                    <q-icon name="vpn_key" />
                  </q-item-section>
                  <q-item-section
                    >{{ item.kty }} Key
                    <q-item-label caption>{{ item.kid }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="text-h6">Signing Key</div>
              <div class="text-caption text-grey">
                For HMAC signed token paste your secret, OR
              </div>
              <div class="text-caption text-grey">
                For RSA and ECDSA signed token paste public or private key in
                PEM format
              </div>
              <q-input
                v-model="signingKey"
                filled
                autogrow
                type="textarea"
                class="jwt_token"
                @input="parseSecret"
              />
            </q-card-section>
            <q-separator v-if="token" />
            <q-card-actions v-if="token">
              <q-btn flat round icon="share" color="red" />
              <q-btn flat color="red" @click="shareWebLink">
                Share via web link
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
        <q-separator />
        <div class="col-sm-12 col-md-6 padding5">
          <q-card bordered flat class="no-margin full-height">
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">Token Details</div>
              <div class="text-caption text-grey">
                Click to copy the attribute values
              </div>
            </q-card-section>
            <q-separator />
            <ValidationBanners
              :token="token"
              :signingKey="signingKey"
              :isValidToken="isValidToken"
              :tokenPayload="tokenPayload"
              :hasJwksKey="hasJwksKey"
              :hasHmacAlg="hasHmacAlg"
            />
            <q-separator />

            <q-banner dense rounded class="bg-primary" v-if="token">
              <div class="text-h6">Token Header</div>
            </q-banner>
            <q-separator />

            <q-card-section>
              <vue-json-pretty
                :path="'res'"
                :data="tokenHeader"
                @click="handleClick"
                :showSelectController="true"
                :highlightMouseoverNode="true"
                v-if="tokenHeader"
              >
              </vue-json-pretty>
            </q-card-section>
            <q-separator v-if="token" />
            <q-banner dense rounded class="bg-primary" v-if="token">
              <div class="text-h6">Token Payload</div>
            </q-banner>
            <q-separator />

            <q-card-section>
              <vue-json-pretty
                :path="'res'"
                :data="tokenPayload"
                @click="handleClick"
                :showSelectController="true"
                :highlightMouseoverNode="true"
                v-if="tokenPayload"
              >
              </vue-json-pretty>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
import { validateTokenMixin } from "src/mixins/validateTokens";
import { copyToClipboard } from "quasar";

import ValidationBanners from "components/ValidationBanners";
import "vue-json-pretty/lib/styles.css";
export default {
  mixins: [validateTokenMixin],
  components: {
    ValidationBanners,
    VueJsonPretty
  },
  methods: {
    shareWebLink() {
      var shareUrl;
      if (this.hasJwksKey && this.jwksKey) {
        shareUrl = `https://quicktools.vercel.app/jwtDebugger#token=${this.token}&jwks=${this.jwksUri}`;
      } else {
        shareUrl = `https://quicktools.vercel.app/jwtDebugger#token=${this.token}`;
      }
      copyToClipboard(shareUrl).then(() => {
        this.$q.notify("Link copied");
      });
    },
    handleClick(path, data) {
      if (typeof data === "object") {
        data = JSON.stringify(data);
      }
      copyToClipboard(data).then(() => {
        this.$q.notify("copied");
      });
    }
  },
  created() {
    this.initialToken();
  }
};
</script>

<style lang="css">
.padding5 {
  padding: 5px;
}
.jwt_token {
  font-family: monospace;
}
.vjs-tree.is-mouseover {
  background-color: #4444af;
  color: white;
}
</style>
