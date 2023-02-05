<template>
  <div>
    <button @click="getPosts">Show Posts</button>
    <div>
    <h2>BE1-1 : {{be11 }}</h2>
    <h2>BE1-2 : {{be12 }}</h2>
    <h2>BE2 : {{be2 }}</h2>

    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      be11: "",
      be12:"",
      be2:""
    }
  },
  methods: {
    getPosts() {
      fetch("/api/be1-1")
        .then((response) => response.text())
        .then((data) => (this.be11 = data))
      fetch("/api/be1-2")
        .then((response) => response.text())
        .then((data) => (this.be12 = data))
      fetch("/api/be2/xxx")
        .then((response) => response.text())
        .then((data) => (this.be2 = data))

    },
  },
}
</script>
