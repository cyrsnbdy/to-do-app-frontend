import React from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-2 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white  rounded-2xl w-[500px] max-w-[90%] p-6 shadow-lg border border-[#1E319D]">
        <h2 className="text-xl font-bold mb-4 text-[#1E319D] py-4">
          Terms and Conditions
        </h2>

        <div className="h-100 overflow-y-auto text-sm space-y-2 border rounded-lg border-[#1E319D]">
          <p className="text-center text-black p-4">
            verse Ako ay may alaga, aso at pusa Hindi nangangagat, nakakatuwa
            Ang aso ay si Doggy, ang pusa ay si Pussy Hindi nag-aaway, parang
            Tito, Vic, and Joey Kahit ano′ng gawin, bali-baligtarin Hindi
            nangangagat, nakangiti pa rin Silang dalawa ay solid kahit aso't
            pusa Ngunit bakit ang tao, ′di nila magawa? chorus "Beep, beep,
            beep", ang sabi ng jeep Beep, beep, beep, beep, beep, beep, beep
            "Beep, beep, beep", ang sabi ng jeep Beep, beep, beep, beep, beep,
            beep, beep "Beep, beep, beep", ang sabi ng jeep Beep, beep, beep,
            beep, beep, beep, beep verse Ako'y bumili ng lobo at lumipad sa
            langit Nasayang lang ang pera, ayoko nang maulit Sana'y naisip ko na
            pagkain na lang Ang aking binili nang hindi nanghihinayang Kaya sa
            susunod, tatandaan ko na Ang tama at mali nang hindi nadidisgrasya
            Hindi tayo perpekto katulad ng iba Tayo ay tao lang, at siyempre
            pati sila chorus "Beep, beep, beep", ang sabi ng jeep Beep, beep,
            beep, beep, beep, beep, beep "Beep, beep, beep", ang sabi ng jeep
            Beep, beep, beep, beep, beep, beep, beep "Beep, beep, beep", ang
            sabi ng jeep Beep, beep, beep, beep, beep, beep, beep hook
            Dubi-dubi, dap-dap, dubi-dubi, dap-dap Dubi-dubi, dap-dap,
            dubi-dubi, dip-dip Dubi-dubi, dap-dap, da-dap, da-dap Bee-bee,
            bee-bee, beep, beep, beep, beep, beep Daba-dubi-dubi, daba-dubi,
            daba-dubi-daba Beep, beep, bee-beep, bee-beep, beep, beep Sabi ng
            jeep, sabi ng jeep, sabi ng-
            Bee-bee-bee-bee-bee-bee-bee-bee-bee-bee-beep, beep Ba-ba-ba-ba,
            bap-bap, ba-ba-ba, bap-bap Pee, pee-pe, pee-pe, pee-pe, pee-pe,
            pee-pe, pee-pe, pee-pe Pee-pe, pee-pe, pee-pe, pee-pe, pee-pe, pe,
            pe, pe, pe, pe Beep, beep, beep, beep verse Ang buhay ng tao, parang
            gulong ng jeepney Madalas, nasa ilalim, sa ibabaw si kumare Minsa′y
            nauuna, minsa′y nahuhuli Dapat matulin ka nang ikaw ay makarami
            Dapat mag-ingat ka sa 'yong pagmamaneho Nang ′di nagagalit ang mga
            pasahero 'Wag singit nang singit sa mga masisikip Baka maipit ka at
            magkasabit-sabit chorus "Beep, beep, beep", ang sabi ng jeep Beep,
            beep, beep, beep, beep, beep, beep "Beep, beep, beep", ang sabi ng
            jeep Beep, beep, beep, beep, beep, beep, beep "Beep, beep, beep",
            ang sabi ng jeep Beep, beep, beep, beep, beep, beep, beep hook
            Mamang tsuper, para na sa tabi Hanggang sa huling biyahe Mamang
            tsuper, para na sa tabi Hanggang sa huling biyahe outro Beep, beep,
            beep, beep, beep, beep, beep Beep, beep, beep, beep, beep, beep,
            beep "Beep, beep, beep", ang sabi ng jeep Beep, beep, beep, beep,
            beep, beep, beep Beep, beep, beep, beep- Mama, para! Beep
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-[#1E319D] text-sm font-bold text-white px-4 py-1 w-full rounded-2xl"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
