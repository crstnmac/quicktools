<template>
  <div>
    <div class="q-pa-sm q-gutter-sm" v-if="token && !isValidToken">
      <q-banner rounded class="bg-red-8 text-white">
        <div class="text-h6">JWT Token is invalid</div>
        The JWT has not been verified and is not valid for use
      </q-banner>
    </div>
    <div class="q-pa-sm q-gutter-sm" v-if="token && isValidToken">
      <q-banner rounded class="bg-green-8 text-white">
        <div class="text-h6">JWT Token is valid</div>
        JWT Token has been verified using the key
      </q-banner>
    </div>
    <div class="q-pa-sm q-gutter-sm" v-if="token && !signingKey && !hasJwksKey">
      <q-banner rounded class="bg-red-8 text-white">
        <div class="text-h6">Key not found</div>
        No signing key was found for token validation
      </q-banner>
    </div>
    <div class="q-pa-sm q-gutter-sm" v-if="token && (signingKey || hasJwksKey)">
      <q-banner rounded class="bg-green-8 text-white">
        <div class="text-h6">Key found</div>
        A signing key is available for token validation
      </q-banner>
    </div>
    <div class="q-pa-sm q-gutter-sm" v-if="token && isValidToken">
      <q-banner rounded class="bg-green-8 text-white">
        <div class="text-h6">Signature verified</div>
        The signature of the JWT token has been verified using a signing key or
        secret
      </q-banner>
    </div>
    <div class="q-pa-sm q-gutter-sm" v-if="token && !isValidToken">
      <q-banner rounded class="bg-red-8 text-white">
        <div class="text-h6">Signature not verified</div>
        The signature of the JWT has not been verified
      </q-banner>
    </div>
    <div
      class="q-pa-sm q-gutter-sm"
      v-if="token && !isTokenExpired && tokenPayload.exp"
    >
      <q-banner rounded class="bg-red-8 text-white">
        <div class="text-h6">Expired</div>
        The JWT token expired on
        {{ expiredDatetime }}
      </q-banner>
    </div>
    <div
      class="q-pa-sm q-gutter-sm"
      v-if="token && isTokenExpired && tokenPayload.exp"
    >
      <q-banner rounded class="bg-green-8 text-white">
        <div class="text-h6">Not expired</div>
        The JWT token will expire on
        {{ expiredDatetime }}
      </q-banner>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "token",
    "isValidToken",
    "tokenPayload",
    "hasJwksKeys",
    "signingKey",
    "hasHmacAlg"
  ],
  computed: {
    isTokenExpired() {
      if (this.tokenPayload) {
        return Math.round(new Date().getTime() / 1000) < this.tokenPayload.exp;
      } else {
        return false;
      }
    },
    expiredDatetime() {
      return new Date(this.tokenPayload.exp * 1000).toLocaleString();
    }
  }
};
</script>

<style lang="scss" scoped></style>
