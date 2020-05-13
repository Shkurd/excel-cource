export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error('No $root for DomListener')
    }
    this.$root = $root
  }
}
