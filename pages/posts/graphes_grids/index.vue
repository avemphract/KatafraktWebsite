<template>
    <div id="graphes_grids">
        <PostTitle imgsrc="/posts-symbols/graphes-grids.svg">
            Graflardan Gride
        </PostTitle>
        <section>
            <p>
                Graflar, düğümler ve bu düğümler arasındaki bağlantıların oluşturduğu ağ yapılarıdır. Graf temelli yol bulma algoritmaları birbiri ile
                bağlantıları düğümleri kullanır. Bu düğümler arasındaki bağlantıların<strong>yönleri ve ağırlıkları (hareket bedeli)</strong>vardır. Bu
                özellikler düğümler arasındaki hareketin yönünü ve bedelini belirler. Bu yöntemi kafes(grid) sistemlerinde de kullanabiliriz. Aslında kafesler
                de bir çeşit graflardır.
            </p>
            <button
                class="block mx-auto"
                @click="previewSvg.transform()">
                {{ previewSvg.gridVisible ? "Gridi Kapat" : "Gridi Aç" }}
            </button>
            <svg
                :id="previewSvg.id"
                xmlns="http://www.w3.org/2000/svg"
                viewBox=".5 .5 5 5"></svg>
        </section>
        <section>
            <ParagraphTitle>Grafların özellikleri</ParagraphTitle>
            <p>
                Graf temelli yol bulma algoritmalarının kullandığı bilgiler düğümler ve bu düğümlerin birbirine nasıl bağlı olduğudur. Biz bu bilgilerden çok
                daha fazlasını bilebiliriz (düğümün kordinatı veya düğüm sıklığı gibi) ama yol bulma algoritmalarının gerçekte bunları bilmesine gerek yoktur.
                Aşağıda örnek bir graf görmektesiniz.
            </p>
            <svg
                id="graph-container"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -1 6 6"></svg>
            <p>Her hangi bir graf için bilmemiz gereken iki şey vardır.</p>
            <ol>
                <li>Graflar kümesi</li>
                <li>Her bir grafın sahip olduğu hatların kümesi</li>
            </ol>
            <p>Yukarıdaki örnek için bunları oluşturursak</p>
            <ol>
                <li>
                    <div>Düğüm kümesi:</div>
                    <span class="flex-row flex m-10">
                        <svg
                            v-for="e in nodeSvgs"
                            :id="e.id"
                            :key="e.node.name"
                            class="nodes mx-2"
                            xmlns="http://www.w3.org/2000/svg"
                            :viewBox="getNodeViewport(e.node.r)"></svg>
                    </span>
                </li>
                <li>
                    <div class="my-auto">
                        Herbir düğümün hatlarının kümesi
                    </div>
                    <div
                        v-for="node in conSvgs.keys()"
                        :key="node.name"
                        class="flex border-1 border-dark-50 border-solid py-5px">
                        <span class="top-0 text-size-1.5rem font-semibold font-mono self-center mx-5 table-column">{{ node.name }}→</span><span class="flex connections border-2 border-solid">
                            <span
                                v-for="edge in node.connections" 
                                :key="edge.from.name + edge.to.name" 
                                class="mx-5 inline-flex">
                                <strong style="align-self: center">
                                    {{ node.name }}
                                </strong>
                                <svg
                                    :id="node.name + '-' + (edge.to == node ? edge.from.name : edge.to.name)"
                                    class="connection inline mx-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="-1 -0.4 2 0.8"></svg>
                                <strong style="align-self: center">
                                    {{ node.name == edge.to.name ? edge.from.name : edge.to.name }}
                                </strong>
                            </span>
                        </span>
                    </div>
                </li>
            </ol>
            <p>Düğümlerin yukarıdaki bilgilere dayanarak düğümlerin kod yapısı aşağıdaki gibi yazılabilir.</p>
            <CodeBlock
                code-map-path="/codesamples/posts/graphes_grids/code1"
                :index="0" />
            <p>
                Düğümleri görselleştirilirken yerleştirilen pozisyona dikkat edilmemesi gerekir. Yukarıdaki görsel düğümleri görselleştirirken anlatımı
                kolaylaştırmak için yapılmıştır. Düğümlerin hangi pozisyonda olduğu bilgisinin graflar için bir önemi yoktur.
            </p>
            <p>Bağlantılar aşağıdaki şekilde yazılabilir.</p>
            <CodeBlock
                code-map-path="/codesamples/posts/graphes_grids/code2"
                :index="0" />
        </section>
        <section>
            <ParagraphTitle>Gridler</ParagraphTitle>
            <p>
                Grid yapıları için grafların bir pozisyona sahip olması gerekmetedir. Bu pozisyondan yola çıkarak düğüm bağlantılarını kendimiz oluştururz.
                Dikdörtgen grid yapıları için üst, alt ve sağ, sol düğümlerinin birbirine eşit uzaklıkta olması gerekir. Graf yapılarından farklı olarak
                düğümlere pozisyonu yazılabilir.
            </p>
            <!--CodeBlock :codeBlocks="code3node"></CodeBlock-->
            <p>
                Haritalar belirlenen komşu kordinatları belirtilir. Belirlenen bir alanda düğümler oluşturulur. Sonra oluşturulmuş düğümlere komşulara göre
                bağlantılar eklenir.
            </p>
            <!--CodeBlock :codeBlocks="code3nodemap"></CodeBlock-->
            <svg
                :id="gridbox.id"
                class="grid-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 5 5"></svg>
        </section>
        <section>
            <ParagraphTitle>Farklı komşu çeşitleri</ParagraphTitle>
            <p>
                En yaygın kullanım yukarıdaki olsa da komşu düğümlere yeni düğümler ekleyebiliriz hatta en yakın düğümleri çıkartabiliriz. Yukarıdaki örnekte
                kullanılan komşular<span class="code-piece">[[0, 1], [0, -1], [1, 0], [-1, 0]]</span>'dır. Eğer düğümler arası çapraz harekette olmasını
                istiyorsak<span class="code-piece">[[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, -1], [-1, 1]]</span>yapmalıyız. Elde edeceğimiz grid
                yapısı aşağıdaki gibi olacaktır.
            </p>
            <svg
                :id="gridCross.id"
                class="grid-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 5 5"></svg>
            <p>Siz de ihtiyacınıza uygun bir şekilde komşu düğüm kordinatlarını düzenleyebilirsiniz.</p>
        </section>
        <section>
            <ParagraphTitle>Engellerin Gösterimesi</ParagraphTitle>
            <p>Grid yapılarında engellerin gösterilmesinde 3 yaygın yöntem kullanılır.</p>
            <ol>
                <li>
                    <strong>Düğümü kaldırmak:</strong>Eğer engel tam bir düğüme karşılık geliyorsa düğümü kaldırarak o noktaya grid üzerinden ulaşımı
                    engelleyebiliriz
                </li>
                <li>
                    <strong>Bağlantıyı kaldırmak:</strong>Engel olan bağlantıları kaldırmak grid üzerinde daha hassas ayarlar yapmamıza olanak sağlayabilir.
                    Eğer engel 2 boyutlu bir şekil yerine 1 boyutlu çizgi şeklinde ise engelin kesiştiği bağlantıları silerek düğüm hareketlerini
                    kısıtlayabiliriz. Eğer engel 2 boyutlu ise engelin içinde kalan düğümlerin tüm bağlantılarını silebiliriz.
                </li>
                <li>
                    <strong>Bağlantıların ağırlıklarını sonsuz yapmak:</strong>Hemen hemen bağlantıları kaldırmakla aynı işlevi görsede çeşitli durumlarda nesne
                    bağlantısız düğüme gittiğinde yazılımsal hatalara sebep olabilmekte. Bu hatayı engellemenin bir yoluda bağlantıyı silmek yerine ağırlığını
                    çok yükselterek her koşulda bu bağlantıyı kullanmayı verimsiz kılmak. Bu sayede nesne bir şekilde bağlantısız düğüme gitse bile bağlantılar
                    sayesinde yazılımsal bir hataya sebep olmayacaktır. Dahası daha sonradan bu engelin değişebileceğini düşünüyorsanız ise de sadece
                    ağırlıkları ile oynayıp engel kaldırıp oluşturabilirsiniz.
                </li>
            </ol>
            <svg
                :id="gridImage.id"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 10 10"></svg>
        </section>
        <section>
            <p>
                Bu yazıda graftların ne olduğunu, graftlardan grid yapısını nasıl oluşturabileceğimizi anlattım bir daha ki yazıda graft bağlantılarının
                özelleklerinden bahsedeceğim.
            </p>
        </section>
    </div>
</template>
<script lang="ts">
import  CodeBlock from '@/components/CodeBlock.vue';
import ParagraphTitle from "@/components/ParagraphTitle.vue";
import PostTitle from "@/components/PostTitle.vue";

import { BiDirectional2DConnection, Connection2D } from '@/utils/posts/Connections2D';
import { GraphMap2D, GridMap2D } from '@/utils/posts/Map2D';
import { Node2D } from '@/utils/posts/Node2D';
import { SingleNodeGraphMap2D, SingleConnectionMap2D } from '@/utils/posts/SingleMap';
import { PreviewGrid } from '@/utils/posts/graphes_grids/PreviewGrid';

const previewGrid = new PreviewGrid("preview-container", 7, 7);

const A = new Node2D(0, 2, "A");
const B = new Node2D(1, 0, "B");
const C = new Node2D(4, 0, "C");
const D = new Node2D(3, 2, "D");
const E = new Node2D(1, 4, "E");
const F = new Node2D(5, 4, "F");
new BiDirectional2DConnection(B, C);
new BiDirectional2DConnection(B, D);
new BiDirectional2DConnection(B, A);
new BiDirectional2DConnection(C, D);
new BiDirectional2DConnection(D, F);
new BiDirectional2DConnection(D, E);
new BiDirectional2DConnection(E, A);
const svg1 = new GraphMap2D("graph-container", [A, B, C, D, E, F]);

const nodeSvgs: Array<SingleNodeGraphMap2D> = new Array<SingleNodeGraphMap2D>();
const conSvgs: Map<Node2D, SingleConnectionMap2D[]> = new Map();
for (const node of [A, B, C, D, E, F]) {
    nodeSvgs.push(new SingleNodeGraphMap2D("node-" + node.name, node));
    conSvgs.set(node, []);
    for (const con of node.connections) {
        conSvgs.get(node).push(new SingleConnectionMap2D(node.name + "-" + (con.to == node ? con.from.name : con.to.name), con));
    }
}

const gridbox: GridMap2D<Node2D> = new (class c extends GridMap2D<Node2D> {
    public beforeConstruction() {
        //Empty
    }
    public createNode(x: number, y: number): Node2D {
        return new Node2D(x, y, null);
    }
    public createConnection(from: Node2D, to: Node2D): Connection2D {
        return new BiDirectional2DConnection(from, to);
    }
})(
    "grid-box",
    5,
    5,
    [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ],
    0.8
);

const gridCross: GridMap2D<Node2D> = new (class c extends GridMap2D<Node2D> {
    public beforeConstruction(): void {
        //Empty
    }
    public createNode(x: number, y: number): Node2D {
        return new Node2D(x, y);
    }
    public createConnection(from: Node2D, to: Node2D): Connection2D {
        return new BiDirectional2DConnection(from, to);
    }
})(
    "grid-cross",
    5,
    5,
    [
        [1, 0],
        [1, 1],
        [1, -1],
        [0, 0],
        [0, 1],
        [0, -1],
        [-1, 0],
        [-1, 1],
        [-1, -1]
    ],
    0.7
);
const gridImage: GridMap2D<Node2D> = new (class c extends GridMap2D<Node2D> {
    private excludeNode: number[][];
    public beforeConstruction(): void {
        this.excludeNode = [
            [3, 0],
            [4, 0],
            [5, 0],
            [3, 1],
            [4, 1],
            [5, 1],
            [6, 1],
            [7, 1],
            [2, 2],
            [3, 2],
            [4, 2],
            [5, 2],
            [6, 2],
            [7, 2],
            [1, 3],
            [2, 3],
            [3, 3],
            [4, 3],
            [5, 3],
            [6, 3],
            [7, 3],
            [1, 4],
            [2, 4],
            [3, 4],
            [4, 4],
            [5, 4],
            [1, 5],
            [2, 5],
            [3, 5],
            [4, 5],
            [5, 5],
            [2, 7],
            [5, 7],
            [6, 7],
            [7, 7],
            [8, 7],
            [2, 8],
            [5, 8],
            [6, 8],
            [7, 8],
            [8, 8]
        ];
    }
    public createNode(x: number, y: number): Node2D {
        if (this.excludeNode.find((p) => p[0] == x && p[1] == y)) return null;
        else return new Node2D(x, y, `${x},${y}`);
    }
    public createConnection(from: Node2D, to: Node2D): Connection2D {
        return new BiDirectional2DConnection(from, to);
    }
})(
    "image-grid-container",
    10,
    10,
    [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ],
    0.8
);
definePageMeta(
    {
        layout: "post-layout",
        type: "Post",
        titleImage: "/posts-symbols/graphes-grids.svg",
        introduction: `Graflar, düğümler ve bu düğümler arasındaki bağlantıların oluşturduğu ağ yapılarıdır. Graf temelli yol bulma algoritmaları birbiri ile
                bağlantıları düğümleri kullanır. Bu düğümler arasındaki bağlantıların<strong>yönleri ve ağırlıkları (hareket bedeli)</strong>vardır. Bu
                özellikler düğümler arasındaki hareketin yönünü ve bedelini belirler. Bu yöntemi kafes(grid) sistemlerinde de kullanabiliriz. Aslında kafesler
                de bir çeşit graflardır.`.replaceAll("\n"," "),
        name:"Graflardan Gride",
        order: 1,
    }
);
export default defineComponent({
    components: { CodeBlock, PostTitle, ParagraphTitle },
    data() {
        return {
            previewSvg: previewGrid,
            svg1: svg1,
            nodeSvgs: nodeSvgs,
            conSvgs: conSvgs,
            gridbox: gridbox,
            gridCross: gridCross,
            gridImage: gridImage
        };
    },
    head: {
    },
    mounted() {
        console.log("Konsole log");
        previewGrid.mounted();
        svg1.mounted();
        nodeSvgs.forEach((n) => n.mounted());
        [...conSvgs.values()].forEach((e) => e.forEach((c) => c.mounted()));
        gridbox.mounted();
        gridCross.mounted();
        gridImage.mounted();
    },
    async created(){
        //Empty
    },
    methods: {
        getNodeViewport(r: number): string {
            return `${-r * 1.2} ${-r * 1.2} ${r * 2.4} ${r * 2.4}`;
        }
    }
});
</script>

<style lang="scss" scoped>
</style>
