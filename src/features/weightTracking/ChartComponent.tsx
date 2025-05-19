import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Text,
} from "recharts";
import { formatDate } from "../../utils/helperFunction";
import { Box, Container } from "../../../styled-system/jsx";
import { useMemo } from "react";
import { useWindowWidth } from "../../customHooks/useWindowWidth";

export interface DataPointInterface {
  date: string | Date;
  value: number;
}

interface ChartComponentProps {
  data: DataPointInterface[];
  maxDataPoints: number;
  color?: string;
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;

  xAxisColor?: string;
  yAxisColor?: string;
  xAxisWidth?: number;
  yAxisWidth?: number;
  gridColor?: string;
  gridStrokeDasharray?: string;
}

const CustomizedXAxisTick = (props: any) => {
  const { x, y, payload, tickColor } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill={tickColor || "#666"}
        fontSize="12px"
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomizedYAxisTick = (props: any) => {
  const { x, y, payload, tickColor } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dx={-10}
        textAnchor="end"
        fill={tickColor || "#666"}
        fontSize="12px"
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomizedAxisLabel = ({
  x,
  y,
  width,
  height,
  stroke,
  children,
  textAnchor,
  position,
  viewBox,
  angle = 0,
  dx = 0,
  dy = 0,
}: any) => {
  return (
    <Text
      x={x + (position === "insideLeft" ? 15 : width / 2) + dx}
      y={y + (position === "insideBottom" ? height : height / 2) + dy}
      angle={angle}
      textAnchor={textAnchor || "middle"}
      fill={stroke}
      fontSize="14px"
      fontWeight="bold"
    >
      {children}
    </Text>
  );
};

const CustomToolTip = ({ active, payload, label, color }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        bg={"surface.s0"}
        p={"1rem"}
        border={`2px solid ${color || "token(colors.effects.border)"}`}
        borderRadius={"md"}
      >
        <p>Date: {payload[0].payload.date}</p>
        <p>{payload[0].payload.value} kg</p>
      </Box>
    );
  }
  return null;
};

const sampleData = (data: DataPointInterface[], maxPoints = 50) => {
  if (data.length <= maxPoints) return data;

  const step = Math.floor(data.length / maxPoints);
  return data.filter((_, index) => index % step === 0);
};

interface WeeklyAggregation {
  sum: number;
  count: number;
}

interface WeeklyData {
  [key: string]: WeeklyAggregation;
}

const aggregateDataByWeek = (data: DataPointInterface[]) => {
  const weeklyData: WeeklyData = {};

  data.forEach((item) => {
    const date = new Date(item.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split("T")[0];

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = { sum: 0, count: 0 };
    }

    weeklyData[weekKey].sum += item.value;
    weeklyData[weekKey].count += 1;
  });

  return Object.entries(weeklyData).map(([date, aggregateData]) => ({
    date,
    value: aggregateData.sum / aggregateData.count,
  }));
};

export default function ChartComponent({
  data,
  maxDataPoints = 20,
  color = "#8884d8",
  title = "Graf",
  xAxisLabel = "Datum",
  yAxisLabel = "Vrijenost",

  xAxisColor = "#8C8B8E",
  yAxisColor = "#8C8B8E",
  xAxisWidth = 2,
  yAxisWidth = 2,
  gridColor = "#D1D1D1",
  gridStrokeDasharray = "5 5",
}: ChartComponentProps) {
  const optimizedData = useMemo(() => {
    data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    if (data.length <= maxDataPoints) return data;

    if (data.length < maxDataPoints * 3) {
      return sampleData(data, maxDataPoints);
    }

    return aggregateDataByWeek(data);
  }, [data, maxDataPoints]);

  const chartData = optimizedData.map((el) => ({
    date: formatDate(el.date + "", false, true),
    value: el.value,
  }));

  const values = chartData.map((el) => el.value);
  const minValue = Math.floor(Math.min(...values) - 1);
  const maxValue = Math.floor(Math.max(...values) + 1);

  return (
    <Container
      w={"100%"}
      bg={"surface.s1"}
      borderRadius={"md"}
      border={"2px solid token(colors.effects.border)"}
      p={"1rem"}
    >
      <Box
        mb={"1rem"}
        color={"typography.secondaryText"}
        fontSize={"h5"}
        textAlign={"center"}
      >
        {title}
      </Box>

      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div style={{ width: "100%", overflow: "hidden" }}>
          <div
            style={{
              minWidth: "300px",
              height: "300px",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid
                  strokeDasharray={gridStrokeDasharray}
                  stroke={gridColor}
                />

                <XAxis
                  dataKey="date"
                  stroke={xAxisColor}
                  strokeWidth={xAxisWidth}
                  tick={<CustomizedXAxisTick tickColor={xAxisColor} />}
                  label={
                    <CustomizedAxisLabel
                      position="insideBottom"
                      stroke={xAxisColor}
                      dy={10}
                    >
                      {xAxisLabel}
                    </CustomizedAxisLabel>
                  }
                />
                <YAxis
                  domain={[minValue, maxValue]}
                  stroke={yAxisColor}
                  strokeWidth={yAxisWidth}
                  tick={<CustomizedYAxisTick tickColor={yAxisColor} />}
                  label={
                    <CustomizedAxisLabel
                      position="insideLeft"
                      stroke={yAxisColor}
                      angle={-90}
                      dx={-10}
                    >
                      {yAxisLabel}
                    </CustomizedAxisLabel>
                  }
                />
                <Tooltip content={<CustomToolTip color={color} />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Weight"
                  stroke={color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Container>
  );
}
