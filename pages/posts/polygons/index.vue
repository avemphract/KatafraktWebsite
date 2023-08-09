<template>
    <div id="polygons">
        <section>
            <PostTitle imgsrc="/posts-symbols/shapes.svg">
                Poligonlar ve Dönüşüm Matrisleri Uygulaması
            </PostTitle>
            <p>
                Bu yazıda poligonlardan ve poligonların dönüşüm matrisi uygulamalarından bahsedeceğim. Poligonlar en az üç noktadan oluşan kenarları düz olacak
                şekilde birleşmiş şekillerdir. Poligonlar kullandığımız bir çok geometrik şekli kapsar. Kare, dikdörtgen, yedigen ve yamuklar poligon
                örnekleridir. Normalde poligonlnar son oluşturulan nokta ile ilk oluşturulan nokta ile bağlanarak kapalı bir alan oluştururlar. Ama bu yazıda
                işlemleri aynı olduğu için son nokta ile ilk noktanın birleşmediği şekle açık poligon ismini verdim.
            </p>
            <div class="grid grid-cols-2 gap-5 self-center justify-center">
                <div>
                    <svg
                        :id="svg_2_container_id"
                        class="svg-container mx-5 sm:(w-auto h-250px) lg:(w-auto h-300px)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-500 -500 1000 1000"></svg>
                    <div class="information-text">
                        Kapalı Poligon
                    </div>
                </div>
                <div>
                    <svg
                        :id="svg_1_container_id"
                        class="svg-container mx-5 sm:(w-auto h-250px) lg:(w-auto h-300px)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-500 -500 1000 1000"></svg>
                    <div class="information-text">
                        Açık Poligon
                    </div>
                </div>
            </div>

            <p>Poligonları oluşturan eleman noktalarıdır. Noktalar sırayla birbirine bağlandığı için noktaları bilmemiz poligonun bilmemiz anlamına gelir.</p>
            <div class="grid grid-cols-2 gap-5 self-center justify-center">
                <span class="flex-1">
                    <svg
                        :id="svg_3_container_id"
                        class="svg-container mx-5 sm:(w-auto h-250px) lg:(w-auto h-300px)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-500 -500 1000 1000"></svg>
                    <ol>
                        <li
                            v-for="(p) of svg_3_shape"
                            :key="p[0][0]"
                            class="italic">
                            Nokta:({{ p[0][0].toFixed(2) }},{{ p[0][1].toFixed(2) }})
                        </li>
                    </ol>
                </span>
                <span class="flex-1">
                    <svg
                        :id="svg_4_container_id"
                        class="svg-container mx-5 sm:(w-auto h-250px) lg:(w-auto h-300px)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-500 -500 1000 1000"></svg>
                    <ol>
                        <li
                            v-for="(p) of svg_4_shape"
                            :key="p[0][0]"
                            class="italic">
                            Nokta:({{ p[0][0].toFixed(2) }},{{ p[0][1].toFixed(2) }})
                        </li>
                    </ol>
                </span>
            </div>
        </section>
        <section>
            <ParagraphTitle>Poligonların Matris şeklinde yazımı</ParagraphTitle>
            <p>
                Poligonları matrislere dönüştürmemiz bizim taşıma döndürme yada yansıtma işlemlerini kolaylıkla yapmamızı sağlayacaktır. Matrisin satır sayısı
                noktaların boyut sayısını, sütun sayısı poligonun sahip olduğu nokta sayısına eşittir. Aşağıdaki gibi noktaları 2 boyutlu, n tane noktalı
                poligonun noktaları yan yana yazarsak poligonun matrisini elde ederiz.
            </p>
            <MathJax class="overflow-x-auto">
                $$\begin{bmatrix}x_1 & x_2& x_3 & ... & x_n\\\ y_1 & y_2 & y_3 & ... & y_n\end{bmatrix}$$
            </MathJax>
            <p>Çeşitli poligonların matrislerini aşağıda örnek olarak gösterilmiştir.</p>
            <svg
                :id="svg_5_container_id"
                class="svg-container mx-5 h-96"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-500 -500 1000 1000"></svg>
            <p>Kırmızı noktaları sürükleyerek poligonun noktarının değişimini görebilirsiniz.</p>
            <div class="items-center mx-auto justify-center">
                <MathJax>$$\begin{bmatrix}x_1 & x_2& x_3 & x_4 & x_5 & x_6 \\\ y_1 & y_2 & y_3 & y_4 & y_5 & y_6\end{bmatrix} =$$</MathJax>
                <MathJax
                    id="equation-5">
                    $$\begin{bmatrix}{{ svg_5_points.map((p) => p[0].toFixed(1)).join(" & ") }}\\\
                    {{ svg_5_points.map((p) => p[1].toFixed(1)).join(" & ") }}\end{bmatrix}$$
                </MathJax>
            </div>
            <svg
                :id="svg_6_container.id"
                class="svg-container mx-5 h-125"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-500 -500 1000 1000"></svg>
            <div class="flex-row items-center mx-auto justify-center">
                <MathJax>$$\begin{bmatrix}x_1 & x_2& x_3 & x_4 & x_5 & x_6 & x_7 & x_8 \\\ y_1 & y_2 & y_3 & y_4 & y_5 & y_6 & y_7 & y_8 \end{bmatrix} =$$</MathJax>
                <MathJax>$$\begin{bmatrix}{{ svg6Points.map((p) => p.x).join(" & ") }}\\\ {{ svg6Points.map((p) => p.y).join(" & ") }}\end{bmatrix}$$</MathJax>
            </div>
        </section>
        <section>
            <ParagraphTitle>Matris yardımıyla şeklin dönüşümü</ParagraphTitle>
            <h3>Öteleme</h3>
            <p>Poligona bütün noktalara öteleme miktarını (x,y) birimini ekleyerek ötelenmiş poligonu bulabiliriz.</p>
            <div class="flex-row">
                <MathJax>$$\begin{bmatrix}x_1 & x_2& x_3 & ... & x_n\\\ y_1 & y_2 & y_3 & ... &y_n\end{bmatrix}+\begin{bmatrix}x_t\\\ y_t\end{bmatrix}=$$</MathJax>
                <MathJax>$$\begin{bmatrix}x_1+x_t & x_2+x_t& x_3+x_t & ... & x_n+y_t\\\ y_1+y_t & y_2+y_t & y_3+y_t & ... & y_n+y_t\end{bmatrix}$$</MathJax>
            </div>
            <p>Örnek olarak sırasıyla (100,150),(-50,100),(-150,-80),(70,-50) olan bir fonsiyonu (145,-176) boyunca kaydırmak istersek</p>
            <div class="flex flex-wrap flex-row justify-center">
                <MathJax>$$\begin{bmatrix}100 & -50& -150 & 70 \\\ 150 & 100 & -80 & -50 \end{bmatrix}+$$ </MathJax>
                <MathJax>$$\begin{bmatrix}145\\\ -176\end{bmatrix}=$$ </MathJax>
                <MathJax>$$\begin{bmatrix}245 & 95& -5 & 215 \\\ -26 & -76 & -256 & -226 \end{bmatrix}$$ </MathJax>
            </div>
            <p>İşlemiyle çokgenimizi ötemiş oluruz.</p>
            <div class="flex gap-10 my-10 text-center content-center">
                <svg
                    :id="svg_7_container.id"
                    class="svg-container mx-5 w-auto h-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-500 -500 1000 1000"></svg>
                <svg
                    :id="svg_8_container.id"
                    class="svg-container mx-5 w-auto h-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-500 -500 1000 1000"></svg>
            </div>
            <p>Aşağıdaki Grafikte xt ve yt değerleri ile serbestçe oynayarak öteleme yapabilirsiniz.</p>
            <svg
                :id="svg_9_container_id"
                class="svg-container mx-5 w-auto h-100px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-500 -500 1000 1000"></svg>
            <div class="flex-row">
                <span class="flex-auto flex place-content-center">
                    <MathJax class="align-top">$$x_t=$$</MathJax>
                    <input
                        v-model="svg_9_x"
                        :input="svg_9_com_transformX(svg_9_x)"
                        class="h-20px self-center w-20 py-0"
                        type="number">
                </span>
                <span class="flex-auto flex place-content-center">
                    <MathJax class="my-auto">$$y_t=$$</MathJax>
                    <input
                        v-model="svg_9_y"
                        :input="svg_9_com_transformY(svg_9_y)"
                        class="h-20px self-center w-20 py-0"
                        type="number">
                </span>
            </div>
            <h3>Katlama</h3>
            <p>Poligonun bütün noktalarını matris çarpımıyla yardımıyla katlayabiliriz. Katlama noktasının referansı (0,0) noktasıdır.</p>
            <div class="flex flex-wrap flex-row justify-center">
                <MathJax>$$\begin{bmatrix}k_x & 0\\\ 0 & k_y\end{bmatrix} *$$ </MathJax>
                <MathJax>$$ \begin{bmatrix}x_1 & x_2& x_3 & ... & x_n\\\ y_1 & y_2 & y_3 & ...&y_n\end{bmatrix} =$$ </MathJax>
                <MathJax>$$ \begin{bmatrix}x_1*k_x & x_2*k_x& x_3*k_x & ... &x_n*k_x\\\ y_1*k_y & y_2*k_y & y_3*k_y & ... & y_n*k_y\end{bmatrix} $$ </MathJax>
            </div>
            <p>Örnek olarak sırasıyla (70, 150), (-20, 180), (-140, -170), (120, -210), olan bir poligonu (1.4,-2.3) katına çıkartalım.</p>
            <p>Ayrıca katlama işlemi sayesinde şekillerin x veya y ekseni üzerinde yansımasınıda bulabiliriz.</p>
            <div class="flex flex-wrap flex-row justify-center">
                <MathJax>$$\begin{bmatrix}1.4 & 0\\\ 0 & -2.3\end{bmatrix} *$$ </MathJax>
                <MathJax>$$ \begin{bmatrix}70 & -20 & -140 & 120 \\\ 150 & 180 & -170 & -210 \end{bmatrix} =$$ </MathJax>
                <MathJax>$$ \begin{bmatrix}98 & -28 & -196 & 168 \\\ -345 & -414 & 390 & 482 \end{bmatrix}$$ </MathJax>
            </div>
            <p>Böylece çokgenimizi katlamış oluruz.</p>
            <div class="flex justify-center gap-10 my-10">
                <svg
                    :id="svg_10_container_id"
                    class="svg-container mx-5 w-auto h-100px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-500 -500 1000 1000"></svg>
                <svg
                    :id="svg_11_container_id"
                    class="svg-container mx-5 w-auto h-100px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-500 -500 1000 1000"></svg>
            </div>
            <p>
                Dikkat ederseniz k değerine -1 vererek şeklimizi yansıtabiliriz. Matrisimizi 
                <MathJax>$$\begin{bmatrix}-1 & 0 \\\ 0 & 1\end{bmatrix}$$</MathJax> 
                ile çarparsak x ekseniz üzerinde yansımasını alırız. Aynı şekilde 
                <MathJax>$$\begin{bmatrix}1 & 0\\\ 0 & -1\end{bmatrix}$$</MathJax> 
                çarparsakta y ekseni üzerinde yansımasını buluruz. Her iki değeride -1 yaparsak hem x hem y eksenine göre yansımasını almış oluruz.
            </p>
            <div class="grid grid-cols-2 justify-center gap-1 my-10">
                <span>
                    <svg
                        :id="svg_12_container.id"
                        class="svg-container mx-5 w-auto h-100px"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-500 -500 1000 1000"></svg>
                    <div class="information-text">Yansıtılmamış hali</div>
                </span>
                <span>
                    <svg
                        :id="svg_13_container.id"
                        class="svg-container mx-5 w-auto h-100px"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-500 -500 1000 1000"></svg>
                    <div class="information-text">y eksenine göre yansıtılmış</div>
                </span>

                <span>
                    <svg
                        :id="svg_14_container.id"
                        class="svg-container mx-5 w-auto h-100px"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-500 -500 1000 1000"></svg>

                    <div class="information-text">x eksenine göre yansıtılmış</div>
                </span>
                <span>
                    <svg
                        :id="svg_15_container.id"
                        class="svg-container mx-5 w-auto h-100px"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-500 -500 1000 1000"></svg>
                    <div class="information-text">Hem y hem de x eksenine göre yansıtılmş</div>
                </span>
            </div>

            <p>Aşağıdaki Grafikte xt ve yt değerleri ile serbestçe oynayarak öteleme yapabilirsiniz.</p>
            <svg
                :id="svg_16_container.id"
                class="svg-container mx-5 w-auto h-100px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-500 -500 1000 1000"></svg>
            <div class="flex">
                <span class="flex-auto flex place-content-center">
                    <MathJax class="align-top">$$k_x=$$</MathJax>
                    <input
                        v-model="svg_16_x"
                        class="h-20px self-center w-20 py-0"
                        type="number"
                        step=".01"
                        @input="
                            svg_16_process.matrix[0][0].value = svg_16_x;
                            svg_16_com.changeElement();
                        ">
                </span>
                <span class="flex-auto flex place-content-center">
                    <MathJax class="my-auto">$$k_y=$$</MathJax>
                    <input
                        v-model="svg_16_y"
                        class="h-20px self-center w-20 py-0"
                        type="number"
                        step=".01"
                        @input="
                            svg_16_process.matrix[1][1].value = svg_16_y;
                            svg_16_com.changeElement();
                        ">
                </span>
            </div>
            <h3>Dönme</h3>
            <p>
                Poligonunu dönüşüm matrisleri yardımıyla döndürebiliriz. Unutmayın dönme noktasının referansı (0,0) noktasıdır. Saat yönün tersi &#x3B8; kadar
                döndürme işlemini aşağıdaki gibidir.
            </p>
            <MathJax>
                $$\begin{bmatrix}cos(&#x3B8;) & sin(&#x3B8;)\\\ -sin(&#x3B8;) & cos(&#x3B8;)\end{bmatrix} * \begin{bmatrix}x_1 & x_2 & ... & x_n\\\ y_1 & y_2 &
                ...&y_n\end{bmatrix}=$$
            </MathJax>
            <MathJax>
                $$\begin{bmatrix}x_1 c(&#x3B8;)-y_1 s(&#x3B8;) & x_2 c(&#x3B8;) - y_2 s(&#x3B8;) & ... & x_n c(&#x3B8;) - y_n s(&#x3B8;) \\\ x_1 c(&#x3B8;) +
                y_1 s(&#x3B8;) & x_1 c(&#x3B8;) + y_1 s(&#x3B8;) & ... & x_n c(&#x3B8;) + y_n s(&#x3B8;)\end{bmatrix}$$
            </MathJax>
            <svg
                :id="svg_17_container.id"
                class="svg-container mx-5 w-auto h-100px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-500 -500 1000 1000"></svg>
            <span class="flex-auto flex place-content-center">
                <MathJax class="align-top">$$&#x3B8;(radyan)=$$</MathJax>
                <input
                    v-model="svg_17_q"
                    class="h-5 self-center w-40 py-0"
                    type="number"
                    step=".01"
                    @input="
                        svg_17_process.matrix[0][0].value = Math.cos(svg_17_q);
                        svg_17_process.matrix[0][1].value = -Math.sin(svg_17_q);
                        svg_17_process.matrix[1][0].value = Math.sin(svg_17_q);
                        svg_17_process.matrix[1][1].value = Math.cos(svg_17_q);
                        svg_17_com.changeElement();
                    ">
            </span>
            <p>
                Bu işlemler en çok kullanılan işlemlerdir. Bunların dışında sıkma(Squeezing), kesme(Shearing), yansıtma(Reflection) gibi işlemlerde vardır.
                Bunlar gibi anlatmadığım diğer dönüşümleri araştırıp uygulayabilirsiniz. Şimdiye kadar anlattığım dönüşümleri art arda birkaç tanesini aynı
                şekle uygulayabilirsiniz. Ayrıca dönüşümleri tek bir şekle uygulamak zorunda da değiliz.
            </p>
            <svg
                :id="svg_18_container.id"
                class="svg-container mx-5 w-auto h-100px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-500 -500 1000 1000"></svg>
            <span class="flex flex-wrap place-content-center">
                <span class="flex-auto flex place-content-center">
                    <MathJax class="align-top">$$x_t=$$</MathJax>
                    <input
                        v-model="svg_18_x"
                        class="h-5 self-center w-40 py-0"
                        type="number"
                        @input="
                            svg_18_shift.matrix[0][0].value = svg_18_x;
                            svg_18_com.changeElement();
                        ">
                </span>
                <span class="flex-auto flex place-content-center">
                    <MathJax class="align-top">$$y_t=$$</MathJax>
                    <input
                        v-model="svg_18_y"
                        class="h-5 self-center w-40"
                        type="number"
                        @input="
                            svg_18_shift.matrix[0][1].value = svg_18_y;
                            svg_18_com.changeElement();
                        ">
                </span>

                <span class="flex-auto flex place-content-center">
                    <MathJax class="align-top">$$&#x3B8;(radyan)=$$</MathJax>
                    <input
                        v-model="svg_18_q"
                        class="h-5 self-center w-40 py-0"
                        type="number"
                        step=".01"
                        @input="
                            svg_18_rot.matrix[0][0].value = Math.cos(svg_18_q);
                            svg_18_rot.matrix[0][1].value = -Math.sin(svg_18_q);
                            svg_18_rot.matrix[1][0].value = Math.sin(svg_18_q);
                            svg_18_rot.matrix[1][1].value = Math.cos(svg_18_q);
                            svg_18_com.changeElement();
                        ">
                </span>
                <span class="flex-auto flex place-content-center">
                    <MathJax class="align-top">$$k_x=$$</MathJax>
                    <input
                        v-model="svg_18_xk"
                        class="h-5 self-center w-20"
                        type="number"
                        step=".01"
                        @input="
                            svg_18_scale.matrix[0][0].value = svg_18_xk;
                            svg_18_com.changeElement();
                        ">
                </span>

                <span class="flex-auto flex place-content-center">
                    <MathJax class="align-top">$$k_y=$$</MathJax>
                    <input
                        v-model="svg_18_yk"
                        class="h-5 self-center w-20 py-0"
                        type="number"
                        step=".01"
                        @input="
                            svg_18_scale.matrix[1][1].value = svg_18_yk;
                            svg_18_com.changeElement();
                        ">
                </span>
            </span>
            <p>
                Yukarıdaki işlemler sırası ile öteleme, döndürme ve katlamadır. Unutmayın her bir işlem diğerinin üzerine yapılır. Önce ötemele işlemi yapılır,
                ötelenmiş matrisin üzerine dönme işlemi, dönmüş matrisin üzerine de katlama yapılır. Eğer farklı nokta etrafında dönme işlemi yapmak
                istiyorsanızda öncelikle şeklimizi öteleriz daha sonra uygulamak istediğimiz dönüşümü uygularız. Son olarak başta eklediğimiz öteleme matrisini
                çıkartırız. Böylece başka nokta etrafında da şeklimizi döndürebiliriz veya yansıtabiliriz.
            </p>
        </section>
        <section>
            <Title>Koda dönüştürme</Title>
            <p>
                Öncelikle yapılan işlemlerin çekirdek şekli değiştirmemesini isteriz çünkü yapılan işlemleri kolayca geri değiştirmek veya çıkarmak zorundayız.
                Bu yüzden şekillerde iki adet matris bulunmaktadır. Birincisi dönüştürülmemiş matris diğeri dönüştürülmüş matris. Her işlem uygulandığında veya
                tickte dönüştürülmemişten işlemlerle dönüştürülmüş matris elde edilir.
            </p>
            <CodeBlock
                class="mb-5"
                code-map-path="/codesamples/posts/polygons/code1"
                :index="0" />
            <CodeBlock
                class="mb-5"
                code-map-path="/codesamples/posts/polygons/code1"
                :index="1" />
            <p>Şimdilik kulladığımız iki adet matris işlemi bulunmaktadır. İşlemleri dinamik olması için enumlarla kaydettim.</p>
            <CodeBlock
                class="mb-5"
                code-map-path="/codesamples/posts/polygons/code1"
                :index="3" />
            <p>
                Şekillere sahip olan bir gövde sınıfı oluşturdum bu sınıfta ortak işleme tutulacak şekilleri işledim. Yukarıdaki örneklerden farklı olarak, aynı
                işlemleri 2 veya daha fazla şekile de uygulayabiliriz. Böylece daha sadece bir şekle sahip olma zorundalılığımız ortadan kalkar.
            </p>
            <CodeBlock
                class="mb-5"
                code-map-path="/codesamples/posts/polygons/code1"
                :index="2" />
        </section>
        <section>
            <ParagraphTitle>Ters Dönüşüm</ParagraphTitle>
            <p>
                Şimdiye kadar sabit bir şekle sahip olduğumuzu düşündük ve bu şeklin aslını koruyarak çeşitli işlemler uygulayarak görüntüsünü yansıttık. Peki
                var olan görüntüden şekli değiştirmeye çalışsaydık nasıl yapmamız gerekirdi? Örneğin poligonun bir noktasını tutup kaydırarak şekli değiştirmek
                istedik. Bunun için şekle uyguladığımız işlemin tersini noktaya uygulayarak şekille aynı dönüşüme getirmemiz gerekir. Toplama işlemini aynı
                değerlerden çıkartarak kolayca tersine çevirebiliriz.
            </p>
            <MathJax>$$ \begin{bmatrix}x_t \\\ y_t \end{bmatrix} + \begin{bmatrix} x \\\ y \end{bmatrix} = \begin{bmatrix}x^{t} \\\ y^{t} \end{bmatrix} $$</MathJax>
            <MathJax>$$ \begin{bmatrix}x_t \\\ y_t \end{bmatrix} - \begin{bmatrix}x^{t} \\\ y^{t} \end{bmatrix} = \begin{bmatrix}x \\\ y \end{bmatrix} $$</MathJax>
            <p>
                Çarpma işlemini tersine çevirmek için öncelikle uygulanan matrisi çarpma işlemine göre tersini almak gerekir. Ondan sonra dönüştürülmüş matrisle
                çarpılır istenen matris elde edilir.
            </p>
            <MathJax>$$ \begin{bmatrix}a & b\\\ c & d \end{bmatrix} * \begin{bmatrix}x \\\ y \end{bmatrix} = \begin{bmatrix}x^{t} \\\ y^{t} \end{bmatrix} $$</MathJax>
            <MathJax>
                $$ \begin{bmatrix}A\end{bmatrix} * \begin{bmatrix}M\end{bmatrix} =\begin{bmatrix}M^{t}\end{bmatrix} \qquad \begin{bmatrix}A^{-1}\end{bmatrix} *
                \begin{bmatrix}M^{t}\end{bmatrix} =\begin{bmatrix}M\end{bmatrix}$$
            </MathJax>
            <p>İki boyutta dönüşüm işlemi yaptığımız için dönüştürme matrisleri ikiye iki boyutundadır. İkiye iki matrislerde dönüşüm aşağıdaki gibidir.</p>
            <MathJax>
                $$ \left(\dfrac{1}{|ad-bc|}*\begin{bmatrix}d & -b\\\ -c & a \end{bmatrix}\right) * \begin{bmatrix}x^{t} \\\ y^{t} \end{bmatrix} =
                \begin{bmatrix}x \\\ y \end{bmatrix} $$
            </MathJax>
            <p>Bir şekil birden fazla dönüşüme uğramış olabilir. Bunun için uygulanan işlemleri sondan başa doğru sırası ile tersini uygulamak gerekir.</p>
            <MathJax>
                $$ \begin{bmatrix}D \end{bmatrix} * (\ \begin{bmatrix}B\end{bmatrix}+( \ \begin{bmatrix}A\end{bmatrix} * \begin{bmatrix}M\end{bmatrix} \ ) \ )
                =\begin{bmatrix}M^{t}\end{bmatrix} $$
            </MathJax>
            <MathJax>
                $$ \begin{bmatrix}A\end{bmatrix}^{-1} * (\ \begin{bmatrix}B\end{bmatrix}-( \ \begin{bmatrix}D\end{bmatrix}^{-1} *
                \begin{bmatrix}M\end{bmatrix}^{t} \ ) \ ) =\begin{bmatrix}M\end{bmatrix} $$
            </MathJax>
            <p>
                Bu örneklerde özellikle noktanın ters dönüşümünü yaptım çünkü göstereceğim örnekte mouse pozisyonunu kullanacağım. Eğer Mouse pozisyonu değilde
                yine bir alanı kullanmak istiyorsanız ters dönüştürülecek matrisin colon sayısını arttırabilirsiniz.
            </p>
            <svg
                :id="svg_19_container.id"
                class="svg-container w-auto h-80"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-500 -500 1000 1000"></svg>
            <span class="flex">
                <span class="flex-auto flex place-content-center">
                    <span class="flex-auto flex place-content-center">
                        <MathJax class="align-top">$$k_x=$$</MathJax>
                        <input
                            v-model="svg_19_xk"
                            class="h-5 self-center w-20 py-0"
                            type="number"
                            step=".01"
                            @input="
                                svg_19_scale.matrix[0][0].value = svg_19_xk;
                                svg_19_com.changeElement();
                            ">
                    </span>

                    <span class="flex-auto flex place-content-center">
                        <MathJax class="align-top">$$k_y=$$</MathJax>
                        <input
                            v-model="svg_19_yk"
                            class="h-5 self-center w-20 py-0"
                            type="number"
                            step=".01"
                            @input="
                                svg_19_scale.matrix[1][1].value = svg_19_yk;
                                svg_19_com.changeElement();
                            ">
                    </span>
                    <span class="flex-auto flex place-content-center">
                        <MathJax class="align-top">$$&#x3B8;(radyan)=$$</MathJax>
                        <input
                            v-model="svg_19_q"
                            class="h-5 self-center w-20 py-0"
                            type="number"
                            step=".01"
                            @input="
                                svg_19_rot.matrix[0][0].value = Math.cos(svg_19_q);
                                svg_19_rot.matrix[0][1].value = -Math.sin(svg_19_q);
                                svg_19_rot.matrix[1][0].value = Math.sin(svg_19_q);
                                svg_19_rot.matrix[1][1].value = Math.cos(svg_19_q);
                                svg_19_com.changeElement();
                            ">
                    </span>
                </span>
            </span>
            <p>
                Son olarak gösterdiğim şekilde öncelikle katlama daha sonra da yansıtma işlemi uygulanmıştır. Yukarıdaki girişlere sayılar yazarak bu işlemlerin
                katsayısını belirleyebilirsiniz. Kırmızı Noktalarlada çokgenin köşelerini oynatabilirsiniz. Burada grafikte dikkat çekmek istediğim şey aslında
                mouse pozisyonunun çokgenin dönüştürülmemiş kordinatı ile eşleşmemektedir. Bize gösterilen görüntüde şekil aslın noktaları &#x3B8; kadar
                döndürülmüş daha sonra da kx ve yk katı alınmış halidir. Mouse kordinatından şeklin kordinatına geçmek için şeklin dönüşümünde kullanılan
                işlermleri tersine çevirip mouse kordinatı için uygulamalıyız. Yukardaki örnekte köşe sürüklendiği zaman mouse kordinatı ters dönüşüm geçirir
                sonra değiştirilen noktanın üzerine kaydedilir.
            </p>
        </section>
        <section>
            <ParagraphTitle>Koda dönüştürme</ParagraphTitle>
            <p>
                Öncelikle matrisin tersini alma ve işaretini ters çevirme fonksiyonları eklendi. Burada yazılan matrisin tersini alma fonksiyonu sadece ikiye
                iki matrislerde geçerlidir.
            </p>
            
            <CodeBlock
                class="mb-5"
                code-map-path="/codesamples/posts/polygons/code2"
                :index="0" />
            <CodeBlock
                class="mb-5"
                code-map-path="/codesamples/posts/polygons/code2"
                :index="1" />
        </section>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

import CodeBlock from "@/components/CodeBlock.vue";
import PostTitle from "@/components/PostTitle.vue";
import ParagraphTitle from "@/components/ParagraphTitle.vue";
import MathJax  from "@/components/MathJax.vue";
import Point from "@/utils/posts/polygons/Point";
import ChangeableShapeContainer from "@/utils/posts/polygons/ChangeableShapeContainer";
import Composition from "@/utils/posts/polygons/Composition";
import PolyLine from "@/utils/posts/polygons/PolyLine";
import Polygon from "@/utils/posts/polygons/Polygon";
import StaticContainer from "@/utils/posts/polygons/StaticContainer";
import { RefMaybe, fakeRef } from "@/utils/types/RefObject";


const svg1Points = [new Point(fakeRef(200), fakeRef(-250)), new Point(fakeRef(300), fakeRef(0)), new Point(fakeRef(-100), fakeRef(200)), new Point(fakeRef(-300), fakeRef(-100)), new Point(fakeRef(0), fakeRef(-300))];

const svg_1_comp = new Composition([new PolyLine(svg1Points)]);
const svg_1_container = new StaticContainer("svg-1", false);
svg_1_container.composition.push(svg_1_comp);

const svg_2_comp = new Composition([new Polygon(svg1Points)]);
const svg_2_container = new StaticContainer("svg-2", false);
svg_2_container.composition.push(svg_2_comp);

const svg3Points = [new Point(ref(200), ref(-250)), new Point(ref(300), ref(0)), new Point(ref(100), ref(250)), new Point(ref(-100), ref(300)), new Point(ref(-300), ref(-100)), new Point(ref(0), ref(-300))];
const svg_3_shape = new Polygon(svg3Points);
const svg_3_container = new ChangeableShapeContainer("svg-3", new Composition([svg_3_shape]));

const svg4Points = [new Point(ref(200), ref(-250)), new Point(ref(300), ref(0)), new Point(ref(100), ref(250)), new Point(ref(-100), ref(300)), new Point(ref(-300), ref(-100)), new Point(ref(0), ref(-300))];
const svg_4_shape = new PolyLine(svg4Points);
const svg_4_container = new ChangeableShapeContainer("svg-4", new Composition([svg_4_shape]));

const svg5Points = [new Point(ref(200), ref(-250)), new Point(ref(300), ref(0)), new Point(ref(100), ref(250)), new Point(ref(-100), ref(300)), new Point(ref(-300), ref(-100)), new Point(ref(0), ref(-300))];

const svg_5_com = new Composition([new Polygon(svg5Points)]);
const svg_5_equation = ref(0);
const svg_5_container = new ChangeableShapeContainer("svg-5", svg_5_com, true);


const svg6Points = [
    new Point(fakeRef(-200), fakeRef(-250)),
    new Point(fakeRef(-320), fakeRef(-50)),
    new Point(fakeRef(-250), fakeRef(150)),
    new Point(fakeRef(-100), fakeRef(350)),
    new Point(fakeRef(100), fakeRef(300)),
    new Point(fakeRef(200), fakeRef(100)),
    new Point(fakeRef(300), fakeRef(-300)),
    new Point(fakeRef(0), fakeRef(-400))
];
const svg_6_com = new Composition([new PolyLine(svg6Points)]);
const svg_6_container = new StaticContainer("svg-6", true, true);
svg_6_container.composition.push(svg_6_com);

const svg_7_points = [new Point(fakeRef(100), fakeRef(150)), new Point(fakeRef(-50), fakeRef(100)), new Point(fakeRef(-150), fakeRef(-80)), new Point(fakeRef(70), fakeRef(-50))];
const svg_7_com = new Composition([new PolyLine(svg_7_points)]);
const svg_7_container = new StaticContainer("svg-7", true, true);
svg_7_container.composition.push(svg_7_com);

const svg_8_points = [new Point(fakeRef(100), fakeRef(150)), new Point(fakeRef(-50), fakeRef(100)), new Point(fakeRef(-150), fakeRef(-80)), new Point(fakeRef(70), fakeRef(-50))];
const svg_8_com = new Composition([new PolyLine(svg_8_points)]);
svg_8_com.position[0][0].value = 145;
svg_8_com.position[0][1].value = -176;
const svg_8_container = new StaticContainer("svg-8", true, true);
svg_8_container.composition.push(svg_8_com);

const svg9Points = [new Point(fakeRef(100), fakeRef(225)), new Point(fakeRef(-125), fakeRef(100)), new Point(fakeRef(-150), fakeRef(-50)), new Point(fakeRef(25), fakeRef(-125)), new Point(fakeRef(150), fakeRef(50))];
const svg_9_com = new Composition([new Polygon(svg9Points)]);
const svg_9_container = new StaticContainer("svg-9", true, true);
svg_9_container.composition.push(svg_9_com);

const svg_10_points = [new Point(fakeRef(70), fakeRef(150)), new Point(fakeRef(-20), fakeRef(180)), new Point(fakeRef(-140), fakeRef(-170)), new Point(fakeRef(120), fakeRef(-210))];
const svg_10_com = new Composition([new Polygon(svg_10_points)]);
const svg_10_container = new StaticContainer("svg-10", true, true);
svg_10_container.composition.push(svg_10_com);
const svg_11_points = [new Point(fakeRef(70), fakeRef(150)), new Point(fakeRef(-20), fakeRef(180)), new Point(fakeRef(-140), fakeRef(-170)), new Point(fakeRef(120), fakeRef(-210))];
const svg_11_com = new Composition([new Polygon(svg_11_points)]);
svg_11_com.operations.push({
    type: "mult",
    matrix: [
        [fakeRef(1.4), fakeRef(0)],
        [fakeRef(0), fakeRef(-2.3)]
    ]
});
const svg_11_container = new StaticContainer("svg-11", true, true);
svg_11_container.composition.push(svg_11_com);

const svg_12_points = [new Point(fakeRef(-100), fakeRef(220)), new Point(fakeRef(20), fakeRef(-180)), new Point(fakeRef(140), fakeRef(270))];
const svg_12_com = new Composition([new Polygon(svg_12_points)]);
const svg_12_container = new StaticContainer("svg-12", true, true);
svg_12_container.composition.push(svg_12_com);

const svg_13_points = [new Point(fakeRef(-100), fakeRef(220)), new Point(fakeRef(20), fakeRef(-180)), new Point(fakeRef(140), fakeRef(270))];
const svg_13_com = new Composition([new Polygon(svg_13_points)]);
svg_13_com.operations.push({
    type: "mult",
    matrix: [
        [fakeRef(-1), fakeRef(0)],
        [fakeRef(0), fakeRef(1)]
    ]
});
const svg_13_container = new StaticContainer("svg-13", true, true);
svg_13_container.composition.push(svg_13_com);

const svg_14_points = [new Point(fakeRef(-100), fakeRef(220)), new Point(fakeRef(20), fakeRef(-180)), new Point(fakeRef(140), fakeRef(270))];
const svg_14_com = new Composition([new Polygon(svg_14_points)]);
svg_14_com.operations.push({
    type: "mult",
    matrix: [
        [fakeRef(1), fakeRef(0)],
        [fakeRef(0), fakeRef(-1)]
    ]
});
const svg_14_container = new StaticContainer("svg-14", true, true);
svg_14_container.composition.push(svg_14_com);

const svg_15_points = [new Point(fakeRef(-100), fakeRef(220)), new Point(fakeRef(20), fakeRef(-180)), new Point(fakeRef(140), fakeRef(270))];
const svg_15_com = new Composition([new Polygon(svg_15_points)]);
svg_15_com.operations.push({
    type: "mult",
    matrix: [
        [fakeRef(-1), fakeRef(0)],
        [fakeRef(0), fakeRef(-1)]
    ]
});
const svg_15_container = new StaticContainer("svg-15", true, true);
svg_15_container.composition.push(svg_15_com);

const svg16Points = [new Point(fakeRef(100), fakeRef(225)), new Point(fakeRef(-125), fakeRef(100)), new Point(fakeRef(-150), fakeRef(-50)), new Point(fakeRef(25), fakeRef(-125)), new Point(fakeRef(150), fakeRef(50))];
const svg_16_com = new Composition([new Polygon(svg16Points)]);
const svg_16_process: { type: "mult" | "add"; matrix: RefMaybe<number>[][] } = {
    type: "mult",
    matrix: [
        [fakeRef(1), fakeRef(0)],
        [fakeRef(0), fakeRef(1)]
    ]
};
svg_16_com.operations.push(svg_16_process);
const svg_16_container = new StaticContainer("svg-16", true, true);
svg_16_container.composition.push(svg_16_com);

const svg17Points = [new Point(fakeRef(-150), fakeRef(150)), new Point(fakeRef(-125), fakeRef(-50)), new Point(fakeRef(125), fakeRef(-0)), new Point(fakeRef(200), fakeRef(325))];
const svg_17_com = new Composition([new Polygon(svg17Points)]);
const svg_17_process: { type: "mult" | "add"; matrix: RefMaybe<number>[][] } = {
    type: "mult",
    matrix: [
        [fakeRef(1), fakeRef(0)],
        [fakeRef(0), fakeRef(1)]
    ]
};
svg_17_com.operations.push(svg_17_process);
const svg_17_container = new StaticContainer("svg-17", true, true);
svg_17_container.composition.push(svg_17_com);

const svg18Points = [new Point(fakeRef(-150), fakeRef(150)), new Point(fakeRef(-125), fakeRef(-50)), new Point(fakeRef(125), fakeRef(0)), new Point(fakeRef(200), fakeRef(325))];
const svg_18_points_2 = [new Point(fakeRef(50), fakeRef(-250)), new Point(fakeRef(-250), fakeRef(-300)), new Point(fakeRef(-50), fakeRef(-200))];
const svg_18_com = new Composition([new Polygon(svg18Points), new PolyLine(svg_18_points_2)]);
const svg_18_shift: { type: "mult" | "add"; matrix: RefMaybe<number>[][] } = {
    type: "add",
    matrix: [[fakeRef(0), fakeRef(0)]]
};
const svg_18_rot: { type: "mult" | "add"; matrix: RefMaybe<number>[][] } = {
    type: "mult",
    matrix: [
        [fakeRef(1), fakeRef(0)],
        [fakeRef(0), fakeRef(1)]
    ]
};
const svg_18_scale: { type: "mult" | "add"; matrix: RefMaybe<number>[][] } = {
    type: "mult",
    matrix: [
        [fakeRef(1), fakeRef(0)],
        [fakeRef(0), fakeRef(1)]
    ]
};
svg_18_com.operations.push(svg_18_shift, svg_18_rot, svg_18_scale);
const svg_18_container = new StaticContainer("svg-18", true, true);
svg_18_container.composition.push(svg_18_com);

const svg_19_points = [
    new Point(fakeRef(-200), fakeRef(0)),
    new Point(fakeRef(0), fakeRef(200)),
    new Point(fakeRef(200), fakeRef(300)),
    new Point(fakeRef(200), fakeRef(100)),
    new Point(fakeRef(400), fakeRef(0)),
    new Point(fakeRef(200), fakeRef(-100)),
    new Point(fakeRef(200), fakeRef(-300)),
    new Point(fakeRef(0), fakeRef(-200))
];
const svg_19_points_2 = [new Point(fakeRef(0), fakeRef(-300)), new Point(fakeRef(-212), fakeRef(-212)), new Point(fakeRef(-300), fakeRef(0)), new Point(fakeRef(-212), fakeRef(212)), new Point(fakeRef(0), fakeRef(300))];
const svg_19_shape = new Polygon(svg_19_points);
const svg_19_shape_2 = new PolyLine(svg_19_points_2);
const svg_19_com = new Composition([svg_19_shape, svg_19_shape_2]);
const svg_19_scale: { type: "mult" | "add"; matrix: RefMaybe<number>[][] } = {
    type: "mult",
    matrix: [
        [fakeRef(1), fakeRef(0)],
        [fakeRef(0), fakeRef(1)]
    ]
};
const svg_19_rot: { type: "mult" | "add"; matrix: RefMaybe<number>[][] } = {
    type: "mult",
    matrix: [
        [fakeRef(1), fakeRef(0)],
        [fakeRef(0), fakeRef(1)]
    ]
};
svg_19_com.operations.push(svg_19_scale, svg_19_rot);
const svg_19_container = new ChangeableShapeContainer("svg-19", svg_19_com, true);
definePageMeta(
    {
        layout: "post-layout",
        type: "Post",
        titleImage: "/posts-symbols/advanced-grids.svg",
        introduction: `Bu yazıda poligonlardan ve poligonların dönüşüm matrisi uygulamalarından bahsedeceğim. Poligonlar en az üç noktadan oluşan kenarları düz olacak
                şekilde birleşmiş şekillerdir. Poligonlar kullandığımız bir çok geometrik şekli kapsar. Kare, dikdörtgen, yedigen ve yamuklar poligon
                örnekleridir. Normalde poligonlnar son oluşturulan nokta ile ilk oluşturulan nokta ile bağlanarak kapalı bir alan oluştururlar. Ama bu yazıda
                işlemleri aynı olduğu için son nokta ile ilk noktanın birleşmediği şekle açık poligon ismini verdim.`.replaceAll("\n"," "),
        name: "Poligonlar ve Dönüşüm Matrisleri Uygulaması",
        order: 3
    }
);
export default defineComponent({
    components: { CodeBlock, PostTitle, ParagraphTitle, MathJax },
    data() {
        return {
            svg_1_container_id: svg_1_container.id,
            svg_2_container_id: svg_2_container.id,
            svg_3_container_id: svg_3_container.id,
            svg_4_container_id: svg_4_container.id,
            svg_5_container_id: svg_5_container.id,
            svg_5_equation: svg_5_equation,
            svg_6_container: svg_6_container,
            svg6Points: svg6Points,
            svg_7_container: svg_7_container,
            svg_8_container: svg_8_container,
            svg_9_container_id: svg_9_container.id,
            svg_9_y: 0,
            svg_9_x: 0,
            svg_10_container_id: svg_10_container.id,
            svg_11_container_id: svg_11_container.id,
            svg_12_container: svg_12_container,
            svg_13_container: svg_13_container,
            svg_14_container: svg_14_container,
            svg_15_container: svg_15_container,
            svg_16_container: svg_16_container,
            svg_16_process: svg_16_process,
            svg_16_com: svg_16_com,
            svg_16_y: 1,
            svg_16_x: 1,
            svg_17_container: svg_17_container,
            svg_17_process: svg_17_process,
            svg_17_com: svg_17_com,
            svg_17_q: 0,
            svg_18_container: svg_18_container,
            svg_18_shift: svg_18_shift,
            svg_18_com: svg_18_com,
            svg_18_rot: svg_18_rot,
            svg_18_scale: svg_18_scale,
            svg_18_x: 0,
            svg_18_y: 0,
            svg_18_q: 0,
            svg_18_xk: 1,
            svg_18_yk: 1,
            svg_19_container: svg_19_container,
            svg_19_q: 0,
            svg_19_xk: 1,
            svg_19_yk: 1,
            svg_19_scale: svg_19_scale,
            svg_19_com: svg_19_com,
            svg_19_rot: svg_19_rot
        };
    },
    computed:{
        svg_3_shape(){ return svg_3_shape.points.map<number[][]>(p=> p.getMatrix())},
        svg_4_shape(){ return svg_4_shape.points.map<number[][]>(p=> p.getMatrix())},
        svg_5_points(){ return svg_5_com.shapes[0].getMatrix()}
    },
    mounted() {
        svg_1_container.mounted();
        svg_2_container.mounted();
        svg_3_container.mounted();
        svg_4_container.mounted();
        svg_5_container.mounted();
        svg_6_container.mounted();
        svg_7_container.mounted();
        svg_8_container.mounted();
        svg_9_container.mounted();
        svg_10_container.mounted();
        svg_11_container.mounted();
        svg_12_container.mounted();
        svg_13_container.mounted();
        svg_14_container.mounted();
        svg_15_container.mounted();
        svg_16_container.mounted();
        svg_17_container.mounted();
        svg_18_container.mounted();
        svg_19_container.mounted();
    },
    methods:{
        svg_9_com_transformX(x:number){
            svg_9_com.transformX(x);
        },
        svg_9_com_transformY(y:number){
            svg_9_com.transformY(y);
        }
    }
});
</script>

<style lang="scss">
h3 {
    font-size: xx-large;
    padding-top: 4em;
    padding-bottom: 1em;
}
.svg-container {
    @apply inline-block;
    border: 1px solid black;
    .polygon,
    .arc {
        fill: #38a3a5;
        stroke: #22577a;
        stroke-width: 20px;
    }
    .polyline,
    .arcline {
        stroke: #22577a;
        stroke-width: 20px;
        stroke-linecap: round;
        fill: none;
    }
    .rect {
        stroke: black;
        stroke-width: 3px;
        stroke-linecap: round;
        fill: none;
    }
    .node {
        fill: #f13030;
        stroke: #5a0001;
        stroke-width: 10px;
    }
    .grabbable {
        cursor: grab;
    }
    .grabbable.grabbing {
        cursor: grabbing;
    }
    .point-text {
        font-family: monospace;
        fill: #5a0001;
        font-weight: 900;
    }
}
</style>
