import React, { useEffect, useMemo, useRef, useState } from "react";
import { createSwapy, SlotItemMapArray, Swapy, utils } from "swapy";

type Item = {
  id: string;
  title: string;
};

const initialItems: Item[] = [
  { id: "1", title: "1" },
  { id: "2", title: "2" },
  { id: "3", title: "3" },
];

let id = 4;
const WebsiteBuilder: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
    utils.initSlotItemMap(items, "id")
  );
  const slottedItems = useMemo(
    () => utils.toSlottedItems(items, "id", slotItemMap),
    [items, slotItemMap]
  );
  const swapyRef = useRef<Swapy | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      utils.dynamicSwapy(
        swapyRef.current,
        items,
        "id",
        slotItemMap,
        setSlotItemMap
      ),
    [items]
  );

  useEffect(() => {
    swapyRef.current = createSwapy(containerRef.current!, {
      manualSwap: true,
      // animation: 'dynamic'
      // autoScrollOnDrag: true,
      // swapMode: 'drop',
      // enabled: true,
      // dragAxis: 'x',
      // dragOnHold: true
    });

    swapyRef.current.onSwap((event) => {
      setSlotItemMap(event.newSlotItemMap.asArray);
    });

    return () => {
      swapyRef.current?.destroy();
    };
  }, []);


  return (
    <div className="flex h-screen bg-gray-100 p-4 gap-2 justify-between">
      <div className="bg-white  rounded w-1/5 border border-gray-200">
        components
        {/* <div className="container" ref={componetsContainerRef}>
          {items.map((item) => (
            <div className="item" key={item.id} data-swapy-item={item.id}>
              {item.title}
            </div>
          ))}

        </div> */}
      </div>
      <div className="bg-white rounded w-full border  border-gray-200">
        canvas
        <div className="container" ref={containerRef}>
          <div className="items">
            {slottedItems.map(({ slotId, itemId, item }) => (
              <div className="slot" key={slotId} data-swapy-slot={slotId}>
                {item && (
                  <div className="item" data-swapy-item={itemId} key={itemId}>
                    <span>{item.title}</span>
                    <span
                      className="delete"
                      data-swapy-no-drag
                      onClick={() => {
                        setItems(items.filter((i) => i.id !== item.id));
                      }}
                    ></span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            className="item item--add"
            onClick={() => {
              const newItem: Item = { id: `${id}`, title: `${id}` };
              setItems([...items, newItem]);
              id++;
            }}
          >
            +
          </div>
        </div>
      </div>
      <div className="bg-white rounded w-1/5 border border-gray-200">
        parameters
      </div>
    </div>
  );
};

export default WebsiteBuilder;
