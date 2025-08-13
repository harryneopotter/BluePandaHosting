import { useEffect, useRef, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

// ✅ Q Panda Lottie Animation (simplified cartoon panda with glow and bounce)
const pandaAnimation: any = {
  v: "5.7.6",
  fr: 60,
  ip: 0,
  op: 180,
  w: 256,
  h: 256,
  nm: "Q Panda Mascot",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Panda Body",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [128, 128, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100, 100], e: [110, 110, 100] },
            { t: 60, s: [110, 110, 100], e: [100, 100, 100] },
            { t: 120, s: [100, 100, 100], e: [110, 110, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [140, 140] },
              d: 1,
              nm: "Body Circle"
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 1, 1, 1] },
              o: { a: 0, k: 100 },
              r: 1,
              nm: "Fill"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 }
            }
          ],
          nm: "Body"
        },
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [-40, -40] },
              s: { a: 0, k: [40, 40] },
              d: 1,
              nm: "Left Ear"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.1, 0.1, 0.1, 1] },
              o: { a: 0, k: 100 },
              r: 1,
              nm: "Fill"
            }
          ],
          nm: "Ear L"
        },
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [40, -40] },
              s: { a: 0, k: [40, 40] },
              d: 1,
              nm: "Right Ear"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.1, 0.1, 0.1, 1] },
              o: { a: 0, k: 100 },
              r: 1,
              nm: "Fill"
            }
          ],
          nm: "Ear R"
        },
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [20, 20] },
              d: 1,
              nm: "Eye"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0, 0, 0, 1] },
              o: { a: 0, k: 100 },
              r: 1,
              nm: "Fill"
            }
          ],
          nm: "Eye",
          nm_position: "center"
        }
      ],
      ip: 0,
      op: 180,
      st: 0,
      bm: 0
    }
  ]
};

// Types
// ... rest of the file remains unchanged
