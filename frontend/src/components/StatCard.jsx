export default function StatCard({

  title,

  value

}) {

  return (

    <div
      style={{

        border:
          "1px solid #ccc",

        padding:
          "15px",

        margin:
          "10px",

        width:
          "200px"

      }}
    >

      <h3>

        {title}

      </h3>

      <h2>

        {value}

      </h2>

    </div>

  );

}