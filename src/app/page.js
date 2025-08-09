'use client'

// @layout
import LayoutB    from "@template/LayoutHB";    

// @Contents
import Body from "@component/Contents/Pages/Abertura/body";

export default function Home() {

  return (
    <LayoutB 
        BodyContent    ={ <Body   />  }
    />
  );
}
