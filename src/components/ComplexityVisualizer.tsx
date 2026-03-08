import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const generateData = () => {
  const data = [];
  for (let n = 1; n <= 20; n++) {
    data.push({
      n: n * 5,
      "O(n)": n * 5,
      "O(n²)": (n * 5) ** 2 / 50,
      "O(log n)": Math.log2(n * 5) * 10,
    });
  }
  return data;
};

const ComplexityVisualizer = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Complexity <span className="text-primary">Visualizer</span>
          </h2>
          <p className="text-muted-foreground text-lg">Complexity Graph — powered by FixForge ML</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 max-w-4xl mx-auto"
        >
          <div className="h-80">
            {show && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generateData()}>
                  <CartesianGrid stroke="hsl(222 30% 18%)" strokeDasharray="3 3" />
                  <XAxis dataKey="n" stroke="hsl(215 20% 55%)" fontSize={12} fontFamily="JetBrains Mono" label={{ value: "Input Size (n)", position: "insideBottom", offset: -5, fill: "hsl(215 20% 55%)", fontSize: 11 }} />
                  <YAxis stroke="hsl(215 20% 55%)" fontSize={12} fontFamily="JetBrains Mono" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(222 40% 10%)",
                      border: "1px solid hsl(222 30% 18%)",
                      borderRadius: "8px",
                      fontFamily: "JetBrains Mono",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontFamily: "JetBrains Mono", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="O(log n)" stroke="#4ade80" strokeWidth={2} dot={false} animationDuration={2000} />
                  <Line type="monotone" dataKey="O(n)" stroke="#00D4FF" strokeWidth={2} dot={false} animationDuration={2500} />
                  <Line type="monotone" dataKey="O(n²)" stroke="#FF6B35" strokeWidth={2} dot={false} animationDuration={3000} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplexityVisualizer;
