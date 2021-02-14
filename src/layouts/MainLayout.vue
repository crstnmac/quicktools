<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-header bordered class="bg-primary text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="left = !left" />

          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
            </q-avatar>
            QuickTools
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList">
              <q-item
                :key="index"
                clickable
                :active="menuItem.label === 'Outbox'"
                v-ripple
                @click="$router.push(menuItem.path)"
              >
                <q-item-section avatar v-if="menuItem.icon">
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
const menuList = [
  {
    label: "Unix Time Converter",
    path: "/epochConverter",
    separator: true
  },
  {
    icon: "help",
    label: "About",
    path: "/about",
    separator: false
  }
];

export default {
  data() {
    return {
      drawer: false,
      menuList
    };
  }
};
</script>
