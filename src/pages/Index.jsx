import React, { useState, useRef, useEffect } from "react";
import { Container, Text, VStack, Input, useToast, Box, keyframes, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const hiragana = [
  { char: "あ", romaji: "a" },
  { char: "い", romaji: "i" },
  { char: "う", romaji: "u" },
  { char: "え", romaji: "e" },
  { char: "お", romaji: "o" },
  { char: "か", romaji: "ka" },
  { char: "き", romaji: "ki" },
  { char: "く", romaji: "ku" },
  { char: "け", romaji: "ke" },
  { char: "こ", romaji: "ko" },
  { char: "さ", romaji: "sa" },
  { char: "し", romaji: "shi" },
  { char: "す", romaji: "su" },
  { char: "せ", romaji: "se" },
  { char: "そ", romaji: "so" },
  { char: "た", romaji: "ta" },
  { char: "ち", romaji: "chi" },
  { char: "つ", romaji: "tsu" },
  { char: "て", romaji: "te" },
  { char: "と", romaji: "to" },
  { char: "な", romaji: "na" },
  { char: "に", romaji: "ni" },
  { char: "ぬ", romaji: "nu" },
  { char: "ね", romaji: "ne" },
  { char: "の", romaji: "no" },
  { char: "は", romaji: "ha" },
  { char: "ひ", romaji: "hi" },
  { char: "ふ", romaji: "fu" },
  { char: "へ", romaji: "he" },
  { char: "ほ", romaji: "ho" },
  { char: "ま", romaji: "ma" },
  { char: "み", romaji: "mi" },
  { char: "む", romaji: "mu" },
  { char: "め", romaji: "me" },
  { char: "も", romaji: "mo" },
  { char: "や", romaji: "ya" },
  { char: "ゆ", romaji: "yu" },
  { char: "よ", romaji: "yo" },
  { char: "ら", romaji: "ra" },
  { char: "り", romaji: "ri" },
  { char: "る", romaji: "ru" },
  { char: "れ", romaji: "re" },
  { char: "ろ", romaji: "ro" },
  { char: "わ", romaji: "wa" },
  { char: "を", romaji: "wo" },
  { char: "ん", romaji: "n" },
  { char: "が", romaji: "ga" },
  { char: "ぎ", romaji: "gi" },
  { char: "ぐ", romaji: "gu" },
  { char: "げ", romaji: "ge" },
  { char: "ご", romaji: "go" },
  { char: "ざ", romaji: "za" },
  { char: "じ", romaji: "ji" },
  { char: "ず", romaji: "zu" },
  { char: "ぜ", romaji: "ze" },
  { char: "ぞ", romaji: "zo" },
  { char: "だ", romaji: "da" },
  { char: "ぢ", romaji: "ji" },
  { char: "づ", romaji: "zu" },
  { char: "で", romaji: "de" },
  { char: "ど", romaji: "do" },
  { char: "ば", romaji: "ba" },
  { char: "び", romaji: "bi" },
  { char: "ぶ", romaji: "bu" },
  { char: "べ", romaji: "be" },
  { char: "ぼ", romaji: "bo" },
  { char: "ぱ", romaji: "pa" },
  { char: "ぴ", romaji: "pi" },
  { char: "ぷ", romaji: "pu" },
  { char: "ぺ", romaji: "pe" },
  { char: "ぽ", romaji: "po" },
  { char: "きゃ", romaji: "kya" },
  { char: "きゅ", romaji: "kyu" },
  { char: "きょ", romaji: "kyo" },
  { char: "しゃ", romaji: "sha" },
  { char: "しゅ", romaji: "shu" },
  { char: "しょ", romaji: "sho" },
  { char: "ちゃ", romaji: "cha" },
  { char: "ちゅ", romaji: "chu" },
  { char: "ちょ", romaji: "cho" },
  { char: "にゃ", romaji: "nya" },
  { char: "にゅ", romaji: "nyu" },
  { char: "にょ", romaji: "nyo" },
  { char: "ひゃ", romaji: "hya" },
  { char: "ひゅ", romaji: "hyu" },
  { char: "ひょ", romaji: "hyo" },
  { char: "みゃ", romaji: "mya" },
  { char: "みゅ", romaji: "myu" },
  { char: "みょ", romaji: "myo" },
  { char: "りゃ", romaji: "rya" },
  { char: "りゅ", romaji: "ryu" },
  { char: "りょ", romaji: "ryo" },
  { char: "ぎゃ", romaji: "gya" },
  { char: "ぎゅ", romaji: "gyu" },
  { char: "ぎょ", romaji: "gyo" },
  { char: "じゃ", romaji: "ja" },
  { char: "じゅ", romaji: "ju" },
  { char: "じょ", romaji: "jo" },
  { char: "びゃ", romaji: "bya" },
  { char: "びゅ", romaji: "byu" },
  { char: "びょ", romaji: "byo" },
  { char: "ぴゃ", romaji: "pya" },
  { char: "ぴゅ", romaji: "pyu" },
  { char: "ぴょ", romaji: "pyo" },
];

const katakana = [
  { char: "ア", romaji: "a" },
  { char: "イ", romaji: "i" },
  { char: "ウ", romaji: "u" },
  { char: "エ", romaji: "e" },
  { char: "オ", romaji: "o" },
  { char: "カ", romaji: "ka" },
  { char: "キ", romaji: "ki" },
  { char: "ク", romaji: "ku" },
  { char: "ケ", romaji: "ke" },
  { char: "コ", romaji: "ko" },
  { char: "サ", romaji: "sa" },
  { char: "シ", romaji: "shi" },
  { char: "ス", romaji: "su" },
  { char: "セ", romaji: "se" },
  { char: "ソ", romaji: "so" },
  { char: "タ", romaji: "ta" },
  { char: "チ", romaji: "chi" },
  { char: "ツ", romaji: "tsu" },
  { char: "テ", romaji: "te" },
  { char: "ト", romaji: "to" },
  { char: "ナ", romaji: "na" },
  { char: "ニ", romaji: "ni" },
  { char: "ヌ", romaji: "nu" },
  { char: "ネ", romaji: "ne" },
  { char: "ノ", romaji: "no" },
  { char: "ハ", romaji: "ha" },
  { char: "ヒ", romaji: "hi" },
  { char: "フ", romaji: "fu" },
  { char: "ヘ", romaji: "he" },
  { char: "ホ", romaji: "ho" },
  { char: "マ", romaji: "ma" },
  { char: "ミ", romaji: "mi" },
  { char: "ム", romaji: "mu" },
  { char: "メ", romaji: "me" },
  { char: "モ", romaji: "mo" },
  { char: "ヤ", romaji: "ya" },
  { char: "ユ", romaji: "yu" },
  { char: "ヨ", romaji: "yo" },
  { char: "ラ", romaji: "ra" },
  { char: "リ", romaji: "ri" },
  { char: "ル", romaji: "ru" },
  { char: "レ", romaji: "re" },
  { char: "ロ", romaji: "ro" },
  { char: "ワ", romaji: "wa" },
  { char: "ヲ", romaji: "wo" },
  { char: "ン", romaji: "n" },
  { char: "ガ", romaji: "ga" },
  { char: "ギ", romaji: "gi" },
  { char: "グ", romaji: "gu" },
  { char: "ゲ", romaji: "ge" },
  { char: "ゴ", romaji: "go" },
  { char: "ザ", romaji: "za" },
  { char: "ジ", romaji: "ji" },
  { char: "ズ", romaji: "zu" },
  { char: "ゼ", romaji: "ze" },
  { char: "ゾ", romaji: "zo" },
  { char: "ダ", romaji: "da" },
  { char: "ヂ", romaji: "ji" },
  { char: "ヅ", romaji: "zu" },
  { char: "デ", romaji: "de" },
  { char: "ド", romaji: "do" },
  { char: "バ", romaji: "ba" },
  { char: "ビ", romaji: "bi" },
  { char: "ブ", romaji: "bu" },
  { char: "ベ", romaji: "be" },
  { char: "ボ", romaji: "bo" },
  { char: "パ", romaji: "pa" },
  { char: "ピ", romaji: "pi" },
  { char: "プ", romaji: "pu" },
  { char: "ペ", romaji: "pe" },
  { char: "ポ", romaji: "po" },
  { char: "キャ", romaji: "kya" },
  { char: "キュ", romaji: "kyu" },
  { char: "キョ", romaji: "kyo" },
  { char: "シャ", romaji: "sha" },
  { char: "シュ", romaji: "shu" },
  { char: "ショ", romaji: "sho" },
  { char: "チャ", romaji: "cha" },
  { char: "チュ", romaji: "chu" },
  { char: "チョ", romaji: "cho" },
  { char: "ニャ", romaji: "nya" },
  { char: "ニュ", romaji: "nyu" },
  { char: "ニョ", romaji: "nyo" },
  { char: "ヒャ", romaji: "hya" },
  { char: "ヒュ", romaji: "hyu" },
  { char: "ヒョ", romaji: "hyo" },
  { char: "ミャ", romaji: "mya" },
  { char: "ミュ", romaji: "myu" },
  { char: "ミョ", romaji: "myo" },
  { char: "リャ", romaji: "rya" },
  { char: "リュ", romaji: "ryu" },
  { char: "リョ", romaji: "ryo" },
  { char: "ギャ", romaji: "gya" },
  { char: "ギュ", romaji: "gyu" },
  { char: "ギョ", romaji: "gyo" },
  { char: "ジャ", romaji: "ja" },
  { char: "ジュ", romaji: "ju" },
  { char: "ジョ", romaji: "jo" },
  { char: "ビャ", romaji: "bya" },
  { char: "ビュ", romaji: "byu" },
  { char: "ビョ", romaji: "byo" },
  { char: "ピャ", romaji: "pya" },
  { char: "ピュ", romaji: "pyu" },
  { char: "ピョ", romaji: "pyo" },
];

const kanaList = [...hiragana, ...katakana];

const Index = () => {
  const [currentKanaIndices, setCurrentKanaIndices] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [correctIndex, setCorrectIndex] = useState(null);
  const inputRef = useRef(null);
  const [fallSpeed, setFallSpeed] = useState(5);
  const [charactersOnScreen, setCharactersOnScreen] = useState([]);
  const fadeOut = keyframes`
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(1.5); }
  `;
  const toast = useToast();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentKanaIndices]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (charactersOnScreen.length < 3) {
          const newIndex = Math.floor(Math.random() * kanaList.length);
          const newCharacter = {
            index: newIndex,
            left: `${Math.random() * 80 + 10}%`,
            top: 0,
          };
          setCharactersOnScreen((prev) => [...prev, newCharacter]);
        }
      },
      Math.random() * 9000 + 1000,
    );

    return () => clearInterval(interval);
  }, [charactersOnScreen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCharactersOnScreen((prev) =>
        prev.map((char) => ({
          ...char,
          top: char.top + 1,
        })),
      );
    }, fallSpeed * 100);

    return () => clearInterval(interval);
  }, [fallSpeed]);

  const checkAnswer = (index) => {
    if (inputValue.trim().toLowerCase() === kanaList[currentKanaIndices[index]].romaji) {
      setCorrectIndex(index);
      setTimeout(() => {
        setCurrentKanaIndices((prev) => {
          const newIndices = [...prev];
          newIndices[index] = Math.floor(Math.random() * kanaList.length);
          return newIndices;
        });
        setCorrectIndex(null);
      }, 1000);
      setInputValue("");
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="relative">
      <VStack spacing={4} width="100%">
        <Slider defaultValue={5} min={1} max={10} onChange={(val) => setFallSpeed(val)}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box width="100%" height="2px" bg="black" />
        {charactersOnScreen.map((char, i) => (
          <Text key={i} fontSize="4xl" position="absolute" left={char.left} top={`${char.top}%`} animation={correctIndex === i ? `${fadeOut} 1s forwards` : "none"} color={correctIndex === i ? "green.500" : "black"}>
            {kanaList[char.index].char}
          </Text>
        ))}
        <Box width="100%" display="flex" justifyContent="center">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              currentKanaIndices.forEach((index, i) => {
                if (e.target.value.trim().toLowerCase() === kanaList[index].romaji) {
                  checkAnswer(i);
                }
              });
            }}
            placeholder="Enter romaji"
            size="lg"
            width="50%"
            textAlign="center"
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
