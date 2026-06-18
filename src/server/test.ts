import { corsair } from "./corsair";

const main = async () => {
  // const res = await corsair.withTenant("dev").gmail.api.labels.list({})

  // const res = await corsair.withTenant("dev").gmail.api.threads.get({
  //   id: '19ebc22a2fa90eb4'
  // })
  // console.log(res);

  const response = await corsair.withTenant("dev").googlecalendar.api.events.getMany({});
  console.log("Response: ", response);


  // corsair.withTenant("dev").gmail.api.messages.delete({
  //   id: "19ec0bf466bc7baa"
  // })

  // const connection = await corsair.withTenant("dev").gmail.api.messages.get({
  //   id: "19ec0bf466bc7baa"
  // });

  // console.log(connection);
};

main();
