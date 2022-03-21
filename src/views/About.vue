<template>
    <div class="about">
        <TransitionGroup
            name="list"
            tag="ul"
        >

            <div
                v-for="(teste, index) in arrayTeste"
                @click="removeItem(index)"
                :key="index"
            >{{teste}}
            </div>
        </TransitionGroup>

    </div>
</template>

<script>
export default {
  data () {
    return {
      arrayTeste: ['aa', 'bb', 'cc']
    }
  },
  methods: {
    removeItem (index) {
      this.arrayTeste.splice(index, 1)
    }
  },
  setup () {}
}
</script>


<style scoped>
</style>