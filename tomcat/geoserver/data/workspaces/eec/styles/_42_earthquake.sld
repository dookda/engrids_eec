<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd" version="1.1.0" xmlns:se="http://www.opengis.net/se">
  <NamedLayer>
    <se:Name>a__42_earthquake</se:Name>
    <UserStyle>
      <se:Name>a__42_earthquake</se:Name>
      <se:FeatureTypeStyle>
        <se:Rule>
          <se:Name>รู้สึกได้ถึงความสั่นไหว </se:Name>
          <se:Description>
            <se:Title>รู้สึกได้ถึงความสั่นไหว </se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>hazard_t</ogc:PropertyName>
              <ogc:Literal>ทุกคนรู้สึกได้ถึงความสั่นไหว วัตถุ/สิ่งของที่ไม่แข็งแรงจะล้มคว่ำลง</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PolygonSymbolizer>
            <se:Fill>
              <se:SvgParameter name="fill">#c41129</se:SvgParameter>
            </se:Fill>
            <se:Stroke>
              <se:SvgParameter name="stroke">#232323</se:SvgParameter>
              <se:SvgParameter name="stroke-opacity">0</se:SvgParameter>
              <se:SvgParameter name="stroke-width">1</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
            </se:Stroke>
          </se:PolygonSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>ผู้ที่อาศัยอยู่ภายในอาคารรู้สึกและสังเกตการสั่นไหวได้เล็กน้อย </se:Name>
          <se:Description>
            <se:Title>ผู้ที่อาศัยอยู่ภายในอาคารรู้สึกและสังเกตการสั่นไหวได้เล็กน้อย </se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>hazard_t</ogc:PropertyName>
              <ogc:Literal>ผู้ที่อาศัยอยู่ภายในอาคารรู้สึกและสังเกตการสั่นไหวได้เล็กน้อย โดยเฉพาะชั้นบนๆ ของอาคาร</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PolygonSymbolizer>
            <se:Fill>
              <se:SvgParameter name="fill">#fc7050</se:SvgParameter>
            </se:Fill>
            <se:Stroke>
              <se:SvgParameter name="stroke">#232323</se:SvgParameter>
              <se:SvgParameter name="stroke-opacity">0</se:SvgParameter>
              <se:SvgParameter name="stroke-width">1</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
            </se:Stroke>
          </se:PolygonSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>ไม่รู้สึกถึงความสั่นไหว ยกเว้นบางกรณีที่อาจจะรู้สึกเพียงเล็กน้อย</se:Name>
          <se:Description>
            <se:Title>ไม่รู้สึกถึงความสั่นไหว ยกเว้นบางกรณีที่อาจจะรู้สึกเพียงเล็กน้อย</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>hazard_t</ogc:PropertyName>
              <ogc:Literal>ไม่รู้สึกถึงความสั่นไหว ยกเว้นบางกรณีที่อาจจะรู้สึกบ้างเพียงเล็กน้อย</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PolygonSymbolizer>
            <se:Fill>
              <se:SvgParameter name="fill">#ffbd9b</se:SvgParameter>
            </se:Fill>
            <se:Stroke>
              <se:SvgParameter name="stroke">#232323</se:SvgParameter>
              <se:SvgParameter name="stroke-opacity">0</se:SvgParameter>
              <se:SvgParameter name="stroke-width">1</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
            </se:Stroke>
          </se:PolygonSymbolizer>
        </se:Rule>
      </se:FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>