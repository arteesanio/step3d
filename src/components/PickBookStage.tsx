import Image from 'next/image'
// import { PickBtnGroup } from "@/dom/atom/popup/PickBtnGroup";
import BookVerticalListScene from '@/model/level/pick/BookVerticalListScene';


export default function PickBookStage({}:any) {
  return (<>
    {/* {"chart" == "chart" && <>
      <div className='flex-row pos-abs top-0 left-0 tx-black  Q_lg_  z-800  ' 
        style={{borderRadius: "0 0 50px 0"}}
      >
        <h1 className="mt-0 flex-1 mb-0 pb-0  block">
          <a href="/pick" className="tx-black nodeco  pa-1 opaci-chov--50 flex-center   ">
          <Image src="/pick.jpg" alt="bank" width={48} height={48} className='mr-1 bord-r-100p  block box-shadow-5-b' 
            style={{border: "1px solid transparent", filter:"invert(.75)"}}
          />
          </a>
        </h1>
      </div>
    </>} */}

    <div className='flex-row flex-align-stretch tx-black w-100 z-10 h-100vh' >
      {/* <div className='ma-1 pa-1 pos-abs z-800 left-0 bottom-0   flex-col flex-justify-start '>
        <PickBtnGroup />
      </div> */}
      <div className='tx-roman flex flex-align-stretch flex-1  flex-center pos-rel' >
          <div className="w-100  pos-rel bord-r-25 h-100" style={{minHeight:"100vh"}}>
            <div className=' w-100 noverflow h-100 '>
              <BookVerticalListScene />
            </div>
          </div>
      </div>
    </div>
  </>)
}