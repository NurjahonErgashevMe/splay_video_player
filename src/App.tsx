import Video from "../public/videos/video.mp4";
// import MultiLevelMenu from "./components/MultiLevelMenu/MultiLevelMenu";
import Player from "./test/Test";

function App() {
  return (
    <div>
      <h1>HELLO WORLD IT IS PLAYER ЖЕ ЕСТЬ </h1>
      {/* <MultiLevelMenu /> */}
      <Player
        reprodutionList={[
          { id: "213243", name: "Transformers", playing: false, percent: 1110 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: true, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
          { id: "12321", name: "Yigit so'zi", playing: false, percent: 2220 },
        ]}
        src={Video}
        playerLanguage="ru"
        backButton={() => console.log("back")}
        title="Уэнсдэй"
        subTitle="Уэнсдэей 1 сезон трейлер"
        dataNext={{
          title: "Черепашки ниндзя",
          description: "Ниндзя черепашки-это бла бла бла",
        }}
        dataPrev={{
          title: "Черепашки ниндзя",
          description: "Ниндзя черепашки-это бла бла бла",
        }}
        onNextClick={() => console.log("next")}
        qualities={[
          { id: "1234", nome: "280p", playing: true, prefix: "240p" },
          { id: "12345", nome: "480p", playing: false, prefix: "480p" },
        ]}
        onChangeQuality={(e) => console.log(e)}
        onPrevClick={() => console.log("prev")}
      ></Player>
    </div>
  );
}

export default App;
