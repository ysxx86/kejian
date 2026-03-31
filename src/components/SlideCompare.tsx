import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Lightbulb, Hand } from 'lucide-react';
import { useSoundContext } from '../App';

export default function SlideCompare() {
  const { play } = useSoundContext();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    play('click');
    setStep(prev => prev + 1);
  };

  const perimeterData = [
    { side: 1, perimeter: 4, ratio: 4 },
    { side: 2, perimeter: 8, ratio: 4 },
    { side: 3, perimeter: 12, ratio: 4 },
    { side: 4, perimeter: 16, ratio: 4 },
    { side: 5, perimeter: 20, ratio: 4 },
  ];

  const areaData = [
    { side: 1, area: 1, ratio: 1 },
    { side: 2, area: 4, ratio: 2 },
    { side: 3, area: 9, ratio: 3 },
    { side: 4, area: 16, ratio: 4 },
    { side: 5, area: 25, ratio: 5 },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-950 p-6 md:p-12 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 z-10">
        <h2 className="text-4xl md:text-5xl font-black text-cyan-400 mb-2 flex items-center gap-4 drop-shadow-md">
          <Lightbulb size={48} /> 对比
        </h2>
        <p className="text-xl text-slate-300 font-medium">
          点击按钮，逐步发现两个例子的异同
        </p>
      </motion.div>

      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full z-10 gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 左边：周长 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-700 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
              <CheckCircle2 size={28} className="text-emerald-400" /> 正方形周长 vs 边长
            </h3>

            <table className="w-full text-center border-collapse text-lg mb-4">
              <tbody>
                <tr className="bg-slate-800/50">
                  <th className="p-2 border-2 border-slate-600 text-cyan-300 font-bold">边长</th>
                  {perimeterData.map((item, i) => (
                    <td key={i} className="p-2 border-2 border-slate-600 text-slate-200">{item.side}</td>
                  ))}
                </tr>
                <tr className="bg-slate-800/50">
                  <th className="p-2 border-2 border-slate-600 text-yellow-300 font-bold">周长</th>
                  {perimeterData.map((item, i) => (
                    <td key={i} className="p-2 border-2 border-slate-600 text-slate-200">{item.perimeter}</td>
                  ))}
                </tr>
                <tr className="bg-emerald-900/30">
                  <th className="p-2 border-2 border-emerald-600 text-emerald-300 font-bold">周长÷边长</th>
                  {perimeterData.map((item, i) => (
                    <td key={i} className="p-2 border-2 border-emerald-600 text-emerald-200 font-bold">{item.ratio}</td>
                  ))}
                </tr>
              </tbody>
            </table>

            {/* 渐进显示的内容 */}
            <div className="flex-1 flex flex-col justify-center gap-3">
              <AnimatePresence mode="wait">
                {step >= 1 && (
                  <motion.div
                    key="ratio1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-950/50 p-4 rounded-2xl border border-emerald-600"
                  >
                    <p className="text-2xl text-emerald-200 font-bold text-center">
                      周长 ÷ 边长 = <span className="text-3xl text-emerald-300">4</span>（一定）
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {step >= 2 && (
                  <motion.div
                    key="conclusion1a"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-900/30 p-3 rounded-xl border border-emerald-500"
                  >
                    <p className="text-xl text-emerald-100 font-bold text-center">
                      比值一定 ✓
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {step >= 3 && (
                  <motion.div
                    key="conclusion1b"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-600/40 p-4 rounded-xl border-2 border-emerald-400"
                  >
                    <p className="text-2xl text-emerald-100 font-bold text-center flex items-center justify-center gap-2">
                      <CheckCircle2 size={28} /> 成正比例
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 右边：面积 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-700 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
              <XCircle size={28} className="text-red-400" /> 正方形面积 vs 边长
            </h3>

            <table className="w-full text-center border-collapse text-lg mb-4">
              <tbody>
                <tr className="bg-slate-800/50">
                  <th className="p-2 border-2 border-slate-600 text-cyan-300 font-bold">边长</th>
                  {areaData.map((item, i) => (
                    <td key={i} className="p-2 border-2 border-slate-600 text-slate-200">{item.side}</td>
                  ))}
                </tr>
                <tr className="bg-slate-800/50">
                  <th className="p-2 border-2 border-slate-600 text-yellow-300 font-bold">面积</th>
                  {areaData.map((item, i) => (
                    <td key={i} className="p-2 border-2 border-slate-600 text-slate-200">{item.area}</td>
                  ))}
                </tr>
                <tr className="bg-red-900/30">
                  <th className="p-2 border-2 border-red-600 text-red-300 font-bold">面积÷边长</th>
                  {areaData.map((item, i) => (
                    <td key={i} className="p-2 border-2 border-red-600 text-red-200 font-bold">{item.ratio}</td>
                  ))}
                </tr>
              </tbody>
            </table>

            {/* 渐进显示的内容 */}
            <div className="flex-1 flex flex-col justify-center gap-3">
              <AnimatePresence mode="wait">
                {step >= 1 && (
                  <motion.div
                    key="ratio2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-950/50 p-4 rounded-2xl border border-red-600"
                  >
                    <p className="text-2xl text-red-200 font-bold text-center">
                      面积 ÷ 边长 = <span className="text-3xl text-red-300">边长</span>（变化）
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {step >= 2 && (
                  <motion.div
                    key="conclusion2a"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/30 p-3 rounded-xl border border-red-500"
                  >
                    <p className="text-xl text-red-100 font-bold text-center">
                      比值不一定 ✗
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {step >= 3 && (
                  <motion.div
                    key="conclusion2b"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-600/40 p-4 rounded-xl border-2 border-red-400"
                  >
                    <p className="text-2xl text-red-100 font-bold text-center flex items-center justify-center gap-2">
                      <XCircle size={28} /> 不成正比例
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* 结论 */}
        <AnimatePresence mode="wait">
          {step >= 4 && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 backdrop-blur-md p-5 rounded-3xl shadow-2xl border-2 border-cyan-500/50"
            >
              <p className="text-3xl md:text-4xl font-black text-center text-white">
                <span className="text-yellow-400">关键：</span>
                <span className="text-cyan-300">比值是否一定</span>，决定
                <span className="text-purple-300">是否成正比例</span>！
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step < 4 && (
        <div className="fixed bottom-28 right-8 z-50">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-5 rounded-full text-2xl font-bold shadow-[0_0_40px_rgba(34,211,238,0.4)] border-2 border-cyan-300/50 flex items-center gap-4"
          >
            <Hand size={28} className="animate-bounce" />
            {step === 0 ? '显示比值' : step === 1 ? '对比比值' : step === 2 ? '得出结论' : '查看总结'}
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </motion.button>
        </div>
      )}
    </div>
  );
}
