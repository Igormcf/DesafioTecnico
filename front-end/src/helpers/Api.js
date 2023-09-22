export const getContainers = async () => {
  try {
    const response = await fetch('https://localhost:7282/containers');
    const data = response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getMovements = async () => {
  try {
    const response = await fetch('https://localhost:7282/movements');
    const data = response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}