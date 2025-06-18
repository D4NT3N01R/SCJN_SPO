import logo from '../../assets/SCJN_NEG.png';
// import './styles.css'
export const Footer = ()=>{
    return(
        
        <footer className="bg-black text-white w-full py-3 flex items-center flex-col">
            <div className=" text-[14px] flex flex-col justify-center items-center">
            <img 
                    src={logo}
                    alt="Logo SCJN" 
                    className=" items-center w-30 mb-1 justify-center " 
                  />
            <h1 > &copy; Copyright SCJN</h1>
            </div>
        </footer>
     
    );
    };