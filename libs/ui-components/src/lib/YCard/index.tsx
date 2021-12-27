export function YCard() {
  return (
    <div className="xl:w-1/3 md:w-1/2 p-4">
      <div
        className="
          c-card
          block
          bg-white
          shadow-md
          hover:shadow-xl
          rounded-lg
          overflow-hidden
        "
      >
        <img
          className="
            lg:h-60
            xl:h-56
            md:h-64
            sm:h-72
            xs:h-72
            h-72
            rounded
            w-full
            object-cover object-center
            mb-4
          "
          src="https://picsum.photos/720/400"
          alt="Image Size 720x400"
        />
        <div className="p-4">
          <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
            Proin eu mi.
          </h3>
          <h2
            className="
              text-lg text-gray-900
              font-medium
              title-font
              mb-4
              whitespace-nowrap
              truncate
              ...
            "
          >
            Duis at velit eu est congue elementum. In hac habitasse platea
            dictumst.
          </h2>
          <p
            className="
              text-gray-600
              font-light
              text-md
              whitespace-nowrap
              truncate
              ...
            "
          >
            Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam
            dui. Proin leo odio, porttitor id, consequat in, consequat ut,
            nulla. Sed accumsan felis.
            <br />
            <a className="inline-flex text-indigo-500" href="#">
              Read More
            </a>
          </p>

          <div className="py-4 border-t border-b text-xs text-gray-700">
            <div className="grid grid-cols-6 gap-1">
              <div className="col-span-2">
                Beds:
                <span
                  className="
                    inline-flex
                    items-center
                    justify-center
                    px-2
                    py-1
                    text-xs
                    font-bold
                    leading-none
                    text-white
                    bg-red-400
                    rounded-full
                  "
                >
                  3
                </span>
              </div>

              <div className="col-span-2">
                Bathrooms:
                <span
                  className="
                    inline-flex
                    items-center
                    justify-center
                    px-2
                    py-1
                    text-xs
                    font-bold
                    leading-none
                    text-white
                    bg-green-400
                    rounded-full
                  "
                >
                  2
                </span>
              </div>

              <div className="col-span-2">
                Area:
                <span
                  className="
                    inline-flex
                    items-center
                    justify-center
                    px-2
                    py-1
                    text-xs
                    font-bold
                    leading-none
                    text-white
                    bg-blue-400
                    rounded-full
                  "
                >
                  110 m <sup>2</sup>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-2">
            <img
              className="w-10 h-10 object-cover rounded-full"
              alt="User avatar"
              src="https://i.pravatar.cc/200"
            />

            <div className="pl-3">
              <div className="font-medium">Jonh Doe</div>
              <div className="text-gray-600 text-sm">CTO of Amazing Places</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
