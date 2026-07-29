import { useMemo, useState } from 'react';
import stonePile from './stone-pile.svg';
import {
  defaultGravity,
  fatiguePercent,
  findMetal,
  makeMessage,
  makeShareUrl,
  maximumGravity,
  minimumGravity,
} from './lib/fatigue';

type Feeling = 'heavy' | 'light';

function App() {
  const [gravity, setGravity] = useState(defaultGravity);
  const [feeling, setFeeling] = useState<Feeling>('heavy');
  const metal = useMemo(() => findMetal(gravity), [gravity]);
  const message = makeMessage(metal.name, feeling);
  const shareUrl = makeShareUrl(message, metal.name);

  return (
    <main className="page-shell">
      <section className="generator" aria-labelledby="page-title">
        <header className="hero">
          <img className="hero-mark" src={stonePile} alt="積み重なった石" />
          <div>
            <p className="eyebrow">TODAY&apos;S FATIGUE, MEASURED IN METAL</p>
            <h1 id="page-title">金属疲労ジェネレーター</h1>
          </div>
        </header>

        <p className="intro">
          「身体が鉛のように重い」を、いろいろな金属で表現してみましょう。比重が大きいほど、今日の疲労度も高めです。
        </p>

        <div className="result-card" aria-live="polite">
          <div className="symbol-tile" aria-label={`${metal.name}の元素記号`}>{metal.symbol}</div>
          <div className="result-copy">
            <p className="result-label">いまの金属</p>
            <h2>{metal.name}</h2>
            <dl className="metrics">
              <div>
                <dt>比重・密度</dt>
                <dd>{metal.specific_gravity} <span>g/cm³</span></dd>
              </div>
              <div>
                <dt>疲労割合</dt>
                <dd>{fatiguePercent(metal.specific_gravity)}<span>%</span></dd>
              </div>
            </dl>
          </div>
        </div>

        <section className="control-section" aria-labelledby="gravity-label">
          <div className="control-heading">
            <label id="gravity-label" htmlFor="gravity">金属の比重を選ぶ</label>
            <output htmlFor="gravity">{gravity.toFixed(2)}</output>
          </div>
          <input
            id="gravity"
            type="range"
            min={minimumGravity}
            max={maximumGravity}
            step="0.01"
            value={gravity}
            onChange={(event) => setGravity(Number(event.target.value))}
          />
          <div className="range-limits" aria-hidden="true">
            <span>軽い · リチウム</span>
            <span>重い · オスミウム</span>
          </div>
        </section>

        <fieldset className="feeling-options">
          <legend>表現を選ぶ</legend>
          <label>
            <input type="radio" name="feeling" value="heavy" checked={feeling === 'heavy'} onChange={() => setFeeling('heavy')} />
            <span>身体が重い</span>
          </label>
          <label>
            <input type="radio" name="feeling" value="light" checked={feeling === 'light'} onChange={() => setFeeling('light')} />
            <span>身体が軽い</span>
          </label>
        </fieldset>

        <section className="share-section" aria-labelledby="share-label">
          <label id="share-label" htmlFor="message">投稿する文</label>
          <textarea id="message" value={message} readOnly rows={2} />
          <a className="share-button" href={shareUrl} target="_blank" rel="noreferrer">
            Xでシェアする <span aria-hidden="true">↗</span>
          </a>
        </section>
      </section>
      <footer>金属の比重を使った、今日の調子のための小さな表現ツール。</footer>
    </main>
  );
}

export default App;
