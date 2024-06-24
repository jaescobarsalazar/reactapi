import { useState, useEffect } from "react";

function ComponentFetch() {
  // 3. info guardará los valores traídos desde la API
  const [info, setInfo] = useState("");

  // 2. Llamamos al función que consume la API al momento de montar el componente
  useEffect(() => {
    consultarInformacion();
  }, []);

  // 1. Función que consulta la API
  const consultarInformacion = async () => {
    const url = 'https://api.gameofthronesquotes.xyz/v1/random';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    setInfo(`${data.sentence} - ${data.character.name}  - ${data.character.house.name}`); // Actualizamos el estado con la información
  }

  // 4. Mostramos la info
  return (
    <div>
      {info}
    </div>
  );
}

export default ComponentFetch;