module.exports = {
  name: "ready",
  execute(client) {
    console.log(`🤖 Bot online as ${client.user.tag}`);

    setInterval(
      () => {
        console.log("🟢 Bot heartbeat ping");
      },
      1000 * 60 * 5,
    );
  },
};
