const Footer = () => {
  return (
    <>
      <div className="text-xs text-dark">
        {new Date().getFullYear()} - Backend de la suerte desafío de{" "}
        <a href="https://danielprimo.io" className="underline" target="_blank">
          danielprimo.io
        </a>{" "}
        - Imagen de fondo de vecteezy{" "}
        <a
          href="https://www.vecteezy.com/vector-art/224422-vector-desert-landscape-illustration"
          target="_blank"
          className="underline"
        >
          VectorBox Studio
        </a>{" "}
        - Icono Github de{" "}
        <a
          href="https://iconos8.es/icons/set/github"
          target="_blank"
          className="underline"
        >
          iconos8.es
        </a>
      </div>
    </>
  );
};

export default Footer;
