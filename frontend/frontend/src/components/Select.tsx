export default function Select () {
    const numberOfCharacters = [25, 50, 100, 200];
    return (
      <>
        <select>
          {numberOfCharacters.map((num) => {
            return <option key={num}>{num}</option>;
          })}
        </select>
      </>
    );
  };