<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld
http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd" version="1.0.0">
  <NamedLayer>
    <Name></Name>
    <UserStyle>
      <Title>A raster style</Title>
      <FeatureTypeStyle>
        <Rule>
          <RasterSymbolizer>
            <ColorMap type="intervals" extended="true"> 
              <ColorMapEntry color="#3cccff" quantity="30" label="0-30" opacity="0.8"/>
              <ColorMapEntry color="#0d74ba" quantity="60" label="0-60" opacity="0.8"/>
              <ColorMapEntry color="#92d051" quantity="106" label="61-106" opacity="0.8"/>
              <ColorMapEntry color="#ffff00" quantity="170" label="107-170" opacity="0.8"/>
              <ColorMapEntry color="#fda102" quantity="340" label="171-340" opacity="0.8"/>
              <ColorMapEntry color="#fd3c3a" quantity="500" label=">341" opacity="0.8"/>
      		</ColorMap>
          </RasterSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>