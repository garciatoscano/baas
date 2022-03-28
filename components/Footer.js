const Footer = ({textos}) => {
  return (
    <>
      <div className="py-6 text-xs text-slate-400 text-center">
        <div> <a href={textos.footer_caption} target="_blank">{textos.footer_caption}</a> </div>

 <div> <a href={textos.credits_link_background_image} target="_blank">{textos.credits_background_image}</a> </div> 
 
 <div> <a href={textos.credits_link_icons} target="_blank">{textos.credits_icons}</a> </div>

 <div className="py-5">{new Date().getFullYear()} </div>
 </div>
    </>
  );
};

export default Footer;
