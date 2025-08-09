'use client'

// @layout
import LayoutHB           from "@template/LayoutHB";    

// @contents
import HeaderContent      from "@content/Pages/Install/Header";
import BodyContent        from "@content/Pages/Install/Body";

export default function Page() {

  return (
    <LayoutHB 
        HeaderContent  ={ <HeaderContent />    }
        BodyContent    ={ <BodyContent />    }
    />
  );
}
