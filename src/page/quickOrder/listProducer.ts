const fetchProducer = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const Producer = await import("@dataMockup/producerData.json");
  return Producer.default;
};

export default fetchProducer;
