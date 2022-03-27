<script>
export default {
  data () {
    return {
      changes: [],
      output: ''
    }
  },
  mounted () {
    document.addEventListener('keyup', this.keyupHandler)
  },
  destroyed () {
    document.removeEventListener('keyup', this.keyupHandler)
  },
  methods: {
    logChange (string) {
      this.changes.push(string)
    },
    keyupHandler (event) {
      if (event.ctrlKey && event.code === 'KeyZ') {
        this.undoHandler()
      } else if (event.ctrlKey && event.code === 'KeyY') {
        this.redoHandler()
      }
    },
    undoHandler () {},
    redoHandler () {}
  }
}
</script>
