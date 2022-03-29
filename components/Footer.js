import Image from "next/image";
const Footer = ({ textos }) => {
  return (
    <>
      <div className="py-6 text-xs text-slate-400 text-center">
        <div >
          
          <a href={textos.footer_link_caption} className="font-bold text-white" target="_blank">
            {textos.footer_caption}
          </a>
        </div>

        <div className="py-4"> {textos.footer_tech_use} </div>
        <div>
          
          <a href={textos.credits_link_background_image} target="_blank">
            {textos.credits_background_image}
          </a>
        </div>

        <div>
          
          <a href={textos.credits_link_icons} target="_blank">
            {textos.credits_icons}
          </a>
        </div>


        <div className="py-3">
          {new Date().getFullYear()} -
          <a href="https://github.com/garciatoscano" className="p-0 m-0">
            <span>Álex García</span>
            <span>
              
              <Image
                src="/icons8-github-30.png"
                width="20"
                height="20"
                className=" opacity-50"
              />
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
