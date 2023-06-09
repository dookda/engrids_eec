<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:se="http://www.opengis.net/se" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd" xmlns:ogc="http://www.opengis.net/ogc" version="1.1.0" xmlns:xlink="http://www.w3.org/1999/xlink">
  <NamedLayer>
    <se:Name>Earthquake</se:Name>
    <UserStyle>
      <se:Name>Earthquake</se:Name>
      <se:FeatureTypeStyle>
        <se:Rule>
          <se:Name>�Դ����������ºҧ��ǹ�֧��͹��ҧ�ҡ�Ѻ�ç���ҧ�����Ҥ�÷���ա�á�����ҧ���ç</se:Name>
          <se:Description>
            <se:Title>�Դ����������ºҧ��ǹ�֧��͹��ҧ�ҡ�Ѻ�ç���ҧ�����Ҥ�÷���ա�á�����ҧ���ç</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>hazard_t</ogc:PropertyName>
              <ogc:Literal>�Դ����������ºҧ��ǹ�֧��͹��ҧ�ҡ�Ѻ�ç���ҧ�����Ҥ�÷���ա�á�����ҧ���ç</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PolygonSymbolizer>
            <se:Fill>
              <se:SvgParameter name="fill">#e53b35</se:SvgParameter>
            </se:Fill>
            <se:Stroke>
              <se:SvgParameter name="stroke">#ffffff</se:SvgParameter>
              <se:SvgParameter name="stroke-width">1</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
            </se:Stroke>
          </se:PolygonSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>�ء������֡��֧���������� �ѵ��/��觢ͧ���������ç���������ŧ</se:Name>
          <se:Description>
            <se:Title>�ء������֡��֧���������� �ѵ��/��觢ͧ���������ç���������ŧ</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>hazard_t</ogc:PropertyName>
              <ogc:Literal>�ء������֡��֧���������� �ѵ��/��觢ͧ���������ç���������ŧ</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PolygonSymbolizer>
            <se:Fill>
              <se:SvgParameter name="fill">#760009</se:SvgParameter>
            </se:Fill>
            <se:Stroke>
              <se:SvgParameter name="stroke">#ffffff</se:SvgParameter>
              <se:SvgParameter name="stroke-width">1</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
            </se:Stroke>
          </se:PolygonSymbolizer>
        </se:Rule>
      </se:FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>