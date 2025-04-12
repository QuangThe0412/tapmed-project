import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./tabs.css";

interface TabsComponentProps {
  data: { title: string; content: any }[];
}

const TabsComponent: React.FC<TabsComponentProps> = ({ data }) => {
  return (
    <Tabs>
      <TabList>
        {data.map((item, index) => (
          <Tab key={index}>{item.title}</Tab>
        ))}
      </TabList>

      {data.map((item, index) => (
        <TabPanel key={index}>
          <p>{item.content}</p>
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default TabsComponent;
