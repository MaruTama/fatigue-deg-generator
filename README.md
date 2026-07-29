# 金属疲労ジェネレーター

金属の比重を使って、その日の疲労感を楽しく表現し、Xへ共有できる小さなWebアプリです。

公開先: [金属疲労ジェネレーター](https://marutama.github.io/fatigue-deg-generator/)

## 開発

Node.js 22以降を使います。

```sh
npm install
npm run dev
```

以下で品質確認と本番ビルドを実行できます。

```sh
npm run test
npm run build
```

React、TypeScript、Viteで構成しています。GitHub Actionsは`main`ブランチへの反映時にテスト・ビルドを実行し、GitHub Pagesへ公開します。
