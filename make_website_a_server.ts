import { Drash, Tengine } from "./tests/deps.ts"

class HomeResource extends Drash.Http.Resource {
  static paths = ["/"]
  public GET () {
    this.response.body = this.response.render("/index.html")
    return this.response
  }
}

const tengine = Tengine({
  render: (...args: unknown[]): boolean => {
    return false;
  },
  views_path: ".",
});

const server = new Drash.Http.Server({
  directory: ".",
  resources: [HomeResource],
  middleware: {
    after_resource: [tengine]
  },
  static_paths: ["/public"]
})

await server.run({
  hostname: "localhost",
  port: 1337
})

console.log('server running')